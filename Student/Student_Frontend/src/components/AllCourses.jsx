import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { Button, CardActions } from '@mui/material';
import './AllCourses.css';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

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

  const enrollCourse = async (courseId) => {
    console.log('Clicked on course with ID:', courseId);

    const studentId = storedStudentDetails._id;

    try {
      const enrollResponse = await fetch(`http://localhost:4400/enrollCourse/${studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseId }) // Pass courseId in the request body
      });

      if (!enrollResponse.ok) {
        throw new Error('Failed to enroll in the course');
      }

      const responseData = await enrollResponse.json();
      console.log(responseData);
      alert("Enroll Course Successful")
      window.location.reload();

    } catch (error) {
      console.error('Error enrolling in the course:', error);
    }
  };

  return (
    <div className='allcourse-page'>
      <div className="course-container">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
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

  );
};

const Courses = ({ id, title, description, image, onClick }) => {
  return (
    <Card className="course-card">
      <CardActionArea >
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
        />
        <CardContent className="course-card-content">
          <Typography variant="h5" component="div" className="course-title">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="course-description">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="course-actions">
        <Button className='enroll-button' size="small" color="primary" startIcon={<SendIcon />} onClick={onClick}>
          Enroll Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default AllCourses;
