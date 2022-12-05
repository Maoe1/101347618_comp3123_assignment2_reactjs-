import axios from 'axios';
import './style.css'
import React, {useState, useEffect, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {faCHeck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Signup() {

  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: ''
  })
  
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  

    const nav = useNavigate();

    

    const SignupForm = async (event, endpoint) => {

        event.preventDefault()
        const v1 = USER_REGEX.test(formData.user_name);
        const v2 = formData.password;
        const v3 = EMAIL_REGEX.test(formData.email);
        if (!v1){
          setErrMsg("User name is Invalid")
          return;
        } else if (!v2){
          setErrMsg("Password is invalid")
          return;
        } else if (!v3) {
          setErrMsg("Email is Invalid")
          return;
        }

        try{
            const base = 'https://assignment1-101347618.herokuapp.com/api'
            const url = `${base}/${endpoint}`
            const res = await axios({
              method: 'post',
              url,
              data: formData,
            }).then(function (response) {
              nav('/login');
          })
        }catch (err) {
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 409) {
              setErrMsg('Username Taken');
          } else {
              setErrMsg('Registration Failed')
          }
        errRef.current.focus();
    }
    }


  return (
    <div className="Auth-form-container">
      <form className="Auth-form"  onSubmit={(e) => SignupForm(e, 'user/signup')}>
        <div className="Auth-form-content">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              value={formData.user_name}
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={(e) => setFormData({...formData, user_name: e.target.value})}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              value={formData.email}
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="d-grid gap-2 mt-3">
            <h4>Already have an account?</h4>
          <Link to="/login">login here</Link>
          </div>
        </div>
      </form>
    </div>
   
  )
}
