import React, { useState, useEffect } from 'react';
import './AddCourse.css';

export default function AddCourse() {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('admin');
    if (!auth) {
      // Redirect user to login page or handle unauthorized access
    }
  }, []);

  const handleLogin = async () => {
    try {
      const result = await fetch('http://localhost:4100/addCourse', {
        method: 'POST',
        body: JSON.stringify({ name, link, description, image }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!result.ok) {
        throw new Error('Failed to add course.');
      }

      const data = await result.json();
      console.log(data); 
      alert("Course successfully added!!!")
      window.location.reload();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className='addCourse'>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}>
        <input className='inputBox'
          type='text'
          placeholder='Enter Course Title'
          value={name}
          onChange={(e) => setName(e.target.value)} /><br />

        <input className='inputBox'
          type='text'
          placeholder='Enter Course Link'
          value={link}
          onChange={(e) => setLink(e.target.value)} /><br />

        <input className='inputBox'
          type='text'
          placeholder='Enter Course Image link'
          value={image}
          onChange={(e) => setImage(e.target.value)} /><br />

        <input className='inputBox'
          type='text'
          placeholder='Enter Course Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)} /><br />
        <button type='submit'>ADD</button>
      </form>
    </div>
  );
}
