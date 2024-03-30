import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Nav.css';
import logoImage from '../assets/eLearning.webp'; // Import the logo image

const Nav = () => {
  const isLoggedIn = !!localStorage.getItem('admin');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={logoImage} alt="Logo" className="logo-image" />
          <span className="website-name">LearnerEase</span>
        </div>
        <ul className="nav-menu">
          {isLoggedIn ? (
            <>
              <li><Link to='/addCourse'>Add Courses</Link></li>
              <li><Link to='/showAllCourses'>All Courses</Link></li>
              <li><Link to='/searchCourse'>Search Course</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to='/'>Admin Log in</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

