import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './nav.css';
import logoImage from '../assets/eLearning.webp'; // Import the logo image

const Nav = () => {
  const isLoggedIn = !!localStorage.getItem('student');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={logoImage} alt="Logo" className="logo-image" />
          <span className="website-name">LearnEase</span>
        </div>
        <ul className="nav-menu">
          {isLoggedIn ? (
            <>
              <li><NavLink to='/home' activeClassName="active">Home</NavLink></li>
              <li><NavLink to='/allcourses' activeClassName="active">All Courses</NavLink></li>
              <li><NavLink to='/searchCourse' activeClassName="active">Search Course</NavLink></li>
              <li><NavLink to='/enrollments' activeClassName="active">Enrollments</NavLink></li>
              {/* <li><NavLink to='/notes' activeClassName="active">Notes</NavLink></li> */}
              {/* <li><NavLink to='/profile' activeClassName="active">Profile</NavLink></li> */}
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><NavLink to='/login' activeClassName="active" st>Log in</NavLink></li>
              <li><NavLink to='/' activeClassName="active">Sign up</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
