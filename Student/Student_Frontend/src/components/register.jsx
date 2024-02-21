import React, { useEffect, useState } from 'react'
import './register.css'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [reEnterPassword, setRePassword] = useState("")
  const [name, setName] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('student');
    if (auth) {

    }
  }, [])

  const collectData = async () => {
    if (password.match(reEnterPassword)) {
      let result = await fetch('http://localhost:5500/register', {
        method: 'post',
        body: JSON.stringify({ name, phoneNo, city, state }),
        headers: {
          'content-type': 'application/json'
        },
      })

      result = await result.json()
      console.log(result)

      localStorage.setItem("student", JSON.stringify(result.result))
      localStorage.setItem("token", JSON.stringify(result.auth))
      navigate('/home')
    }
    else {
      alert('Re-entered password and password are not same try again')
    }

  }
  return (
    <div className='registerPage'>
      <h1>Crack Your Goal with India's top educator</h1>
      <form onSubmit={(e)=>e.preventDefault}>
        <input className='inputBox'
          type='text'
          placeholder='Fullname'
          value={name} onChange={(e) => setName(e.target.value)} /><br></br>

        <input className='inputBox'
          type='text'
          placeholder='Phone No.'
          value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} /><br></br>

        <input className='inputBox'
          type='text'
          placeholder='City'
          value={city} onChange={(e) => setCity(e.target.value)} /><br></br>

        <input className='inputBox'
          type='text'
          placeholder='State'
          value={state} onChange={(e) => setState(e.target.value)} /><br></br>

        <input className='inputBox'
          type='text'
          placeholder='country'
          value={country} onChange={(e) => setCountry(e.target.value)} /><br></br>

        <button onClick={collectData}
          type='button'>Register</button>
      </form>
    </div>
  )
}
