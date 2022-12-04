import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
  
export const Nav = styled.nav`
  background: #63D471;
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  /* Third Nav */
  /* justify-content: flex-start; */
`;
  
  
export const Bars = styled(FaBars)`
  display: none;
  color: #808080;

`;
  
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  
`;
  
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
`;
  