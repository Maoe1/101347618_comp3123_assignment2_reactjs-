import axios from 'axios';
import './style.css'
import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const location = useLocation();
    const [isLoggedin, setIsLoggedin] = useState(false);
  

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const nav = useNavigate();

    const LoginForm = async (event, endpoint) => {
        event.preventDefault()
        console.log("login info  : " +  JSON.stringify(formData))
       
            const base = 'https://assignment1-101347618.herokuapp.com/api'
            const url = `${base}/${endpoint}`
            const res = await axios({
              method: 'post',
              url,
              data: formData,
            }).then(function (response) {
              localStorage.setItem('token-info', JSON.stringify(formData));
              setIsLoggedin(true);
              setFormData({...formData, user_name: ''});
              setFormData({...formData, email: ''});
              setFormData({...formData, password: ''});
              nav('/emplist')
              console.log(response);
          })
          .catch(function (error) {
              
              console.log(error);
            });
      
      }
  return (
    <div className="Auth-form-container">
    <form className="Auth-form"  onSubmit={(e) => LoginForm(e, 'user/login')}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Log in</h3>
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
            login
          </button>
          <p>or</p>
          <Link className="btn btn-secondary" to='/signup'>Signup</Link>
        </div>
        <p className="forgot-password text-right mt-2">
          Forgot <a href="#">password?</a>
        </p>
      </div>
    </form>
  </div>
  )
}