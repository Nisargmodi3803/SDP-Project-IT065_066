import React, { useEffect, useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from './firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [reEnterPassword, setRePassword] = useState("")
    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem('student');
        if (auth) {

        }
    }, [])


    const collectData = async () => {
        if (password.match(reEnterPassword)) {
            let result = await fetch('https://sdp-project-it065-066-9.onrender.com/register', {
                method: 'post',
                body: JSON.stringify({ email, password, name, phoneNo, city, state }),
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

    const signInWithGoogle = async () => {
        signInWithPopup(auth, provider).then((data) => {
            setEmail(data.user.email);
        });

        let result = await fetch('https://sdp-project-it065-066-9.onrender.com/signInWithGoogle', {
            method: 'post',
            body: JSON.stringify({ email }),
            headers: {
                'content-type': 'application/json'
            },
        });

        result = await result.json()
        console.log(result)

        localStorage.setItem("student", JSON.stringify(result.result))
        localStorage.setItem("token", JSON.stringify(result.auth))
        navigate('/home')
    }

    return (
        <div className='container-signup'>
            <div className='wrapper'>
                <div className='registerPage'>

                    <form onSubmit={(e) => e.preventDefault}>
                        <h1>Crack Your Goal with India's top educator</h1>
                        <input className='inputBox'
                            type='email'
                            placeholder='Enter your Email'
                            value={email} onChange={(e) => setEmail(e.target.value)} /><br></br>

                        <input className='inputBox'
                            type='password'
                            placeholder='Enter Password'
                            value={password} onChange={(e) => setPassword(e.target.value)} /><br></br>

                        <input className='inputBox'
                            type='password'
                            placeholder='Re-enter password'
                            value={reEnterPassword} onChange={(e) => setRePassword(e.target.value)} /><br></br>

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

                        <button onClick={collectData}
                            type='button'>Sign up</button>
                        <button onClick={signInWithGoogle} type='button'>SignIn with Google</button>
                    </form>

                </div>
            </div>
        </div>
    )
}   
