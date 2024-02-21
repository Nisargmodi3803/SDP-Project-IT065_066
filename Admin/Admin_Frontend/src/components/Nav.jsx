import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  const auth = localStorage.getItem('admin')
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear();
    navigate('/')
  }
  return (
    <div>

      {
        auth ?
          <ul className='nav-UI'>
            <li><Link to='/addCourse'>Add Courses</Link></li>
            <li><Link to='/showAllCourses'>All Courses</Link></li>
            <li><Link to='/searchCourse'>Search Course</Link></li>
            {/* <li><Link to='/deleteCourse'>Delete Course</Link></li> */}
            <li><Link onClick={logout} to='/'>Logout</Link></li>
            {/* <li><div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
            </div></li> */}
          </ul>
          :
          <ul className='nav-UI'>
            <li><Link to='/'>Admin Log in</Link></li>
            {/* <li><div className="form-check form-switch">
              <input className="form-check-input" type='checkbox' role='switch' id="flexSwitchCheckDefault" />
              <label className="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
            </div></li> */}
          </ul>
      }

    </div>
  )
}
