import React from 'react';
import { useState } from 'react';
import {useNavigate, useEffect} from 'react-router-dom'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  
const Navbar = () => {
  const [isLoggedin, setIsLoggedin] = useState(true);

  const nav = useNavigate();

  
  function Logout() {
      localStorage.removeItem('token-info');
      setIsLoggedin(false);
      nav('/login');
    };
    

  return (
    <>
      <Nav>
        <Bars className="Auth-form-content" />
        <NavMenu>
        <h4>Employee Management App</h4>
          
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
        <div>
      {
        isLoggedin
        ? <p>login below</p>
        : <button onClick={Logout}>Log out</button>
      }
      </div>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;