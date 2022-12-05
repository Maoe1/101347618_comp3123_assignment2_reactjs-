import axios from 'axios';
import './style.css'
import React, {useState, useEffect, useRef} from 'react';
import {useNavigate, useHistory, Link} from 'react-router-dom'

const NAME_REGEX = /^[A-Za-z][A-Za-z0-9_]{1,29}$/
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default function AddEmployee() {

    const nav = useNavigate();
    const userRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const [formData, setFormData] = useState({
        first_name:'',
        last_name:'',
        gender:'male',
        salary:'',
        email: ''
      })

    const genders = ['male', 'female']

    const AddEmployee = async (event, endpoint) => {
        event.preventDefault()
        const v1 = NAME_REGEX.test(formData.first_name)
        const v2 = NAME_REGEX.test(formData.last_name);
        const v3 = EMAIL_REGEX.test(formData.email);
        if (!v1){
          setErrMsg("First name is Invalid")
          return;
        } else if (!v2){
          setErrMsg("last name is invalid")
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
            nav('/emplist')
            console.log(response);
          })
        }
        catch (err) {
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
    <form className="Auth-form"  onSubmit={(e) => AddEmployee(e, 'emp/employees')}>
      <div className="Auth-form-content">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h3 className="Auth-form-title">Add Employee</h3>
        <div className="form-group mt-3">
          <label>First Name</label>
          <input
            type="text"
            value={formData.first_name}
            className="form-control mt-1"
            placeholder="Enter first name"
            onChange={(e) => setFormData({...formData, first_name: e.target.value})}
          />
        </div>
        <div className="form-group mt-3">
          <label>Last Name</label>
          <input
            type="text"
            value={formData.last_name}
            className="form-control mt-1"
            placeholder="Enter last name"
            onChange={(e) => setFormData({...formData, last_name: e.target.value})}
          />
        </div>
        <div className="form-group mt-3">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            className="form-control mt-1"
            placeholder="Enter email"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="form-group mt-3">
          <label>Salary</label>
          <input
          type="number"
           value={formData.salary}
           className="form-control mt-1"
           placeholder="Enter salary"
           onChange={(e) => setFormData({...formData, salary: e.target.value})}
           />
        </div>
        <div className="form-group mt-3">
          <label>Gender</label>
          <select name='gender' onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                  {
                      genders.map((gender) => (
                              <option key={gender} value={gender}>{gender}</option>
                      ))
                  }
              </select>
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
          <Link className="btn btn-secondary" to='/emplist'>Cancel</Link>
        </div>
      </div>
    </form>
  </div>
  )
}
