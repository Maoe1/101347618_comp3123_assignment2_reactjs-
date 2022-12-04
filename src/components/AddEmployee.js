import axios from 'axios';
import './style.css'
import React, {useState, useEffect} from 'react';
import {useNavigate, useHistory, Link} from 'react-router-dom'


export default function AddEmployee() {

    const nav = useNavigate();
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
        console.log("Employee info  : " +  JSON.stringify(formData))
       
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
          .catch(function (response) {
              //handle error
              console.log(response);
            });
      
      }
  return (
    <div className="Auth-form-container">
    <form className="Auth-form"  onSubmit={(e) => AddEmployee(e, 'emp/employees')}>
      <div className="Auth-form-content">
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
