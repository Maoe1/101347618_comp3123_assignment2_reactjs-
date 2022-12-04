import axios from 'axios';
import './style.css'
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'

export default function Signup(props) {

    const nav = useNavigate();

    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        password: ''
    })

    const SignupForm = async (event, endpoint) => {
        event.preventDefault()
        console.log("signup info  : " +  JSON.stringify(formData))
       
            const base = 'https://assignment1-101347618.herokuapp.com/api'
            const url = `${base}/${endpoint}`
            const res = await axios({
              method: 'post',
              url,
              data: formData,
            }).then(function (response) {
              nav('/login');
              console.log(response);
          })
          .catch(function (error) {
              //handle error
              console.log(error);
            });
      
      }


  return (
    <div className="Auth-form-container">
      <form className="Auth-form"  onSubmit={(e) => SignupForm(e, 'user/signup')}>
        <div className="Auth-form-content">
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
