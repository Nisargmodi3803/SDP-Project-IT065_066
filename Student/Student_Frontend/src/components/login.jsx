import { React, useState, useEffect } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const Auth = localStorage.getItem('student');
    if (Auth) {
      navigate('/')
    }
  }, [])

  const handleLogin = async () => {
    let result = await fetch('http://localhost:5000/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json'
      },
    })

    result = await result.json()
    if (result.auth) {
      localStorage.setItem("student", JSON.stringify(result.stud))
      localStorage.setItem("token", JSON.stringify(result.auth))
      navigate('/home')
    }
    else {
      alert("Please enter correct details")
    }

  }

  return (
    <div className='container-login'>
     <div className='wrapper'>
        <form className='background' onSubmit={(e) => e.preventDefault}>
          <h1>Log in</h1>
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
          <button className='btn'
            onClick={handleLogin} type='button'>Log in</button>
        </form>
      </div>
    </div>

  )
}
