import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './nav.css'

export default function Nav() {
  const auth = localStorage.getItem('student')
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear();
    navigate('/login')
  }
  return (
    <div>

      {
        auth ?
          <ul className='nav-UI'>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/allcourses'>All courses</Link></li>
            <li><Link to='/searchCourse'>Search Course</Link></li>
            <li><Link to='/enrollments'>Enrollments</Link></li>
            <li><Link to='/notes'>Notes</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link onClick={logout} to='/login'>Logout</Link></li>
            {/* <li><div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
            </div></li> */}
          </ul>
          :
          <ul className='nav-UI'>
            <li><Link to='/login'>Log in</Link></li>
            <li><Link to='/'>Sign up</Link></li>
            {/* <li><div className="form-check form-switch">
              <input className="form-check-input" type='checkbox' role='switch' id="flexSwitchCheckDefault" />
              <label className="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
            </div></li> */}
          </ul>
      }

    </div>
  )
}
