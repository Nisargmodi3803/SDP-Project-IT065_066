import { React, useState, useEffect } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from './firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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
    let result = await fetch('https://sdp-project-it065-066-9.onrender.com/login', {
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
  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      setEmail(user.email);

      const response = await fetch('https://sdp-project-it065-066-9.onrender.com/signInWithGoogle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();
      localStorage.setItem('student', JSON.stringify(data.student || {}));
      localStorage.setItem('token', JSON.stringify(data.auth || ''));
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);
      alert('Error signing in with Google');
    }
  };

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
            onClick={handleLogin} type='button'>Log in</button><br/>
          <div className="google-btn" onClick={signInWithGoogle}>
            <img src="http://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg" alt="Google Logo" width="20" height="20" />
            <span>Sign In with Google</span>
          </div>
        </form>
      </div>
    </div>
  )
}
