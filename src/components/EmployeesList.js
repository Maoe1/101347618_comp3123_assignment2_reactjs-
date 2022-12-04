import React, { Component } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import './style.css'


export default class EmployeesList extends Component {

    
    
    //Define state default values
    constructor(props) {
        super(props)
    
        this.state = {
             employees : [],
             empid: 0
        }
    }
    //Component Lifecycle Callback
    componentDidMount = () =>{
        this.displayEmployees()
    }

    async displayEmployees(){
        const base = 'https://assignment1-101347618.herokuapp.com/api/emp/employees'
         const url = `${base}`
        const res = await axios({
            method: 'get',
            url
        }).then(res =>  { 
            console.log(res.data)
            this.setState({...this.state, employees : res.data})
        })
      .catch(function (error) {
          console.log(error);
        });
    }

    deleteEmpByID = (id) => {
        axios.delete(`https://assignment1-101347618.herokuapp.com/api/emp/employees?eid=${id}`)
        .then(res =>  { 
            let empList = this.state.employees.filter(e => {
                return e._id !== id
            })

            this.setState({...this.state, employees: empList})
        })
    }
    render() {
        
        return (
            
            <div className="Auth-form-content">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round"/>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <h1 style={{ backgroundColor: '#3DED97'}}> Employee List </h1>
                <br/>
                <br/>
                <Link className="btn btn-primary" to='/addemployee'>Add Employee</Link>
                <br/>
                <br/>
                <table key="g"className="table table-striped table-hover">
				<thead key="a">
					<tr>
						<th key="firsthead">First Name</th>
						<th key="secondhead">Last Name</th>
                        <th key="thirdhead">Email</th>
                        <th key="fourthhead">Actions</th>
					</tr>
				</thead>
				<tbody key="b">
                    
                    {
                        this.state.employees.map(emp => (
                        <>
                        <tr>
                            <td key='first'>{emp.first_name}</td>
                            <td key='last'>{emp.last_name}</td>
                            <td key='email' >{emp.email}</td>
                            <td key="actions">
							    <Link key="z" to={`/updateEmployee/${emp._id}`} className="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></Link>
							    <a href="#deleteEmployee" className="delete" data-toggle="modal"
                                onClick={ (e) => this.deleteEmpByID(emp._id)}><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                                
						    </td>
                            </tr>
                        </>
                        ))
                    }
	
                    </tbody>
                    </table>

               
            </div>
        )
    }
}
