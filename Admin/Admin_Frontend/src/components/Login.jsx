import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (admin) {
      navigate('/showAllCourses');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      let result = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (result.ok) {
        const data = await result.json();
        if (data.auth) {
          localStorage.setItem('admin', JSON.stringify(data.stud));
          localStorage.setItem('token', JSON.stringify(data.auth));
          navigate('/showAllCourses');
        } else {
          alert('Please enter correct details');
        }
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className='loginPage'>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}>
        <input className='inputBox'
          type='email'
          placeholder='Enter your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} /><br></br>

        <input className='inputBox'
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} /><br></br>
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
}