import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from './firebase';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setRePassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const navigate = useNavigate();

    const collectData = async () => {
        if (password === reEnterPassword) {
            try {
                const response = await fetch('https://sdp-project-it065-066-9.onrender.com/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, name, phoneNo, city, state }),
                });
                const data = await response.json();
                localStorage.setItem('student', JSON.stringify(data.result || {}));
                localStorage.setItem('token', JSON.stringify(data.auth || ''));
                navigate('/home');
            } catch (error) {
                console.error('Error:', error);
                alert('Error signing up');
            }
        } else {
            alert('Re-entered password and password are not the same. Please try again.');
        }
    };

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
        <div className='container-signup'>
            <div className='wrapper'>
                <div className='registerPage'>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <h1>Crack Your Goal with India's top educator</h1>
                        <input
                            className='inputBox'
                            type='email'
                            placeholder='Enter your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        /><br />
                        <input
                            className='inputBox'
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /><br />
                        <input
                            className='inputBox'
                            type='password'
                            placeholder='Re-enter password'
                            value={reEnterPassword}
                            onChange={(e) => setRePassword(e.target.value)}
                        /><br />
                        <input
                            className='inputBox'
                            type='text'
                            placeholder='Fullname'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        /><br />
                        <input
                            className='inputBox'
                            type='text'
                            placeholder='Phone No.'
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                        /><br />
                        <input
                            className='inputBox'
                            type='text'
                            placeholder='City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        /><br />
                        <input
                            className='inputBox'
                            type='text'
                            placeholder='State'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        /><br />
                        <button onClick={collectData} type='button'>Sign up</button>
                        <button onClick={signInWithGoogle} type='button'>Sign In with Google</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
