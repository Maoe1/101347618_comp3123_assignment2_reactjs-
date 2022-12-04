import {
    BrowserRouter as Router,
    Link,
    Outlet,
    Routes
  } from "react-router-dom";


import React from 'react'
import { Navigate, Route } from 'react-router-dom'

export default function PrivateWrapper() {
  let  userid = localStorage.getItem("token-info") == null ? false : true;
  return (
      <>
          {userid ? <Outlet  /> : <Navigate to="/login" />};
      </>

  )
}
