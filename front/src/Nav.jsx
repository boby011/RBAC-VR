import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './RBAC.css';
// import logo from './images/nav.png'; 

const Nav = () => {
  
  

  return (
    <>
      <div className='nav'>
        <div className='head'>
          <h1>RBAC</h1>
        </div>
        <div className='list'> 
              <Link to='/'><span>Login</span></Link>
              <Link to='/Signin'><span>Signin</span></Link>
          
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Nav;
