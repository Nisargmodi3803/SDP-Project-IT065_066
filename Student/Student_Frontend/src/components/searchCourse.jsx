import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { Button, CardActionArea, CardActions, TextField } from '@mui/material';
import './SearchCourse.css';

export default function SearchCourse() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  let storedStudentDetails = localStorage.getItem('student')
  try {
    storedStudentDetails = JSON.parse(storedStudentDetails);
  } catch (error) {
    console.log(error)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4200/showCourses');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const response = await fetch('http://localhost:4260/searchCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: searchQuery })
      });
      if (!response.ok) {
        throw new Error('Failed to search course');
      }
      const data = await response.json();
      setSearchResult(data.courseData);
    } catch (error) {
      console.error('Error searching course:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const enrollCourse = async (courseId) => {
    console.log('Clicked on course with ID:', courseId);

    const studentId = storedStudentDetails._id;

    try {
      const enrollResponse = await fetch(`http://localhost:4400/enrollCourse/${studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseId })
      });

      if (!enrollResponse.ok) {
        throw new Error('Failed to enroll in the course');
      }

      const responseData = await enrollResponse.json();
      console.log(responseData);
      alert("Enroll Course Successful")

    } catch (error) {
      console.error('Error enrolling in the course:', error);
    }
  };

  return (
    <div className='searchpage-container'>
      <div className="search-course-container">
        <TextField
          label="Search Course"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleSearch} disabled={isSearching}>
          Search
        </Button>
        <div className="course-list">
          {Array.isArray(searchResult) && searchResult.length > 0 ? (
            searchResult.map((course) => (
              <Courses
                key={course._id}
                id={course._id}
                title={course.name}
                description={course.description}
                image={course.image}
                onClick={() => enrollCourse(course._id)}
              />
            ))
          ) : (
            <Typography>No courses found</Typography>
          )}
        </div>
      </div>
    </div>

  );
}

const Courses = ({ id, title, description, image, onClick }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 5 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" startIcon={<SendIcon />} onClick={onClick}>
          Enroll Now
        </Button>
      </CardActions>
    </Card>
  );
};
