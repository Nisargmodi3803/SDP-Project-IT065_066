import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './profile.css'
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import Avatar from 'react-avatar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditProfile from './EditProfile';

export default function Profile() {
  const [Image, setImage] = useState("")
  const navigate = useNavigate()

  let storedStudentDetails = localStorage.getItem('student')
  try {
    storedStudentDetails = JSON.parse(storedStudentDetails);

  } catch (error) {
    console.log(error)
  }

  return (
    <div>
      <div className='userDetails'>
        <aside>
          <div className='profileDetails'>
            <h3>Name : {storedStudentDetails.name}</h3>
            <h3>Email : {storedStudentDetails.email}</h3>
            <h3>Phone No. : {storedStudentDetails.phoneNo}</h3>
            <h3>City : {storedStudentDetails.city}</h3>
            <h3>State : {storedStudentDetails.state}</h3>
            <button onClick={() => {
              <BrowserRouter>
                <Routes>
                  <Route path='/profile/editProfile' element={<EditProfile />}></Route>
                </Routes>
              </BrowserRouter>
              navigate('/profile/editProfile')

            }}>Edit profile</button>
          </div>
        </aside>
        {/* <aside>
          <div className='photo'>
            <Avatar
              size="300"
              src={""}
              alt={"M"}
            />
            <InputText type='file'
              accept='/image/*'
              onChange={(e) => {
                const file = e.target.files[0]
                if (file && file.type.substring(0, 5) === 'image') {
                  setImage(file)
                }
                else {
                  setImage(null)
                }
              }} />
          </div>
        </aside> */}

      </div>
    </div>
  )
}
