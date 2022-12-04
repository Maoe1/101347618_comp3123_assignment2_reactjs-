import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState } from 'react'
import axios from 'axios';
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import AddEmployee from './components/AddEmployee.js'
import EmployeesList from './components/EmployeesList.js'
import UpdateEmployee from './components/UpdateEmployee.js'
import {Routes, Route, Outlet} from "react-router-dom"
import Navbar from './components/Navbar/navbar.js'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter } from "react-router-dom";
import PrivateWrapper from './components/PrivateWrapper.js'


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route exact path="/" element={<Signup />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/signup" element={<Signup />} />
    <Route exact element={<PrivateWrapper  />}>
        <Route exact path="/emplist" element={<EmployeesList />} />
    </Route>
    <Route exact element={<PrivateWrapper  />}>
        <Route exact path="/addemployee" element={<AddEmployee />} />
    </Route>
    <Route exact element={<PrivateWrapper  />}>
        <Route exact path="/updateemployee/:eid" element={<UpdateEmployee />} />
    </Route>
    <Route exact path="/updateemployee/:eid" element={<UpdateEmployee />} />
      <Route exact path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
  
      

  
 
   
  );
}

export default App;
