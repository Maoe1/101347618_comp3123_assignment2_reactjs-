import axios from 'axios';
import './style.css'
import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate, Link, useParams} from 'react-router-dom';

export default function Updatemployeeform() {
    let {eid }= useParams(); 
    const nav = useNavigate();

    const [formData, setFormData] = useState({
        first_name:'',
        last_name:'',
        gender:'',
        salary:'',
        email: ''
      })

      useEffect(() => {
        getEmployeeDataById(eid)
      }, []); 
      
      
      
    const genders = ['male', 'female']
    
    
      const getEmployeeDataById = async (eid) => {
        const base = 'https://assignment1-101347618.herokuapp.com/api/emp/employees'
        const url = `${base}/${eid}`
        const res = await axios({
          method: 'get',
          url
        }) .then(res =>  { 
          console.log(res.data)
          let empData = res.data
          setFormData(empData);
         
      }).catch(function (error) {
          //handle error
          console.log(error);
        
        });
    
      }
    const UpdateEmployee = async (event) => {
      event.preventDefault();
        console.log("Employee info  : " +  JSON.stringify(formData))
       
            const base = 'https://assignment1-101347618.herokuapp.com/api/emp/employees'
            const url = `${base}/${eid}`
            const res = await axios({
              method: 'put',
              url,
              data: formData,
            }).then(function (response) {
              nav('/emplist')
              console.log(response);
          })
          .catch(function (error) {
              //handle error
              console.log(error);
            });
      
      }
  return (
    <div className="Auth-form-container">
    <form className="Auth-form"  onSubmit={(e) => UpdateEmployee(e)}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Update Employee</h3>
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
                  
                      
                              <option key='male' value="male">male</option>
                              <option key='female' value="female">female</option>
                    
        
              </select>
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <Link className="btn btn-secondary" to='/emplist'> Cancel</Link>
        </div>
      </div>
    </form>
  </div>
  )
}
