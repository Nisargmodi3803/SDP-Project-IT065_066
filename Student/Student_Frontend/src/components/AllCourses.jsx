import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { Button, CardActionArea, CardActions } from '@mui/material';

// Container component to hold the cards in a row
const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  // const history = useHistory(); // Initialize history for navigation

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

  // Function to handle course click
  const handleCourseClick = async (courseId) => {
    console.log('Clicked on course with ID:', courseId);
    
    // Redirect to enrolled courses page with course ID as a query parameter
    const studentId = storedStudentDetails._id;
  
    try {
      // Fetch course details
      const courseResponse = await fetch(`http://localhost:4800/findCourse/${courseId}`);
      if (!courseResponse.ok) {
        throw new Error('Failed to fetch course data');
      }
      const courseData = await courseResponse.json();
  
      // Enroll student in the course
      const enrollResponse = await fetch(`http://localhost:4400/enrollCourse/${studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseData) // Pass the entire courseData object
      });
  
      if (!enrollResponse.ok) {
        throw new Error('Failed to enroll in the course');
      }
  
      const responseData = await enrollResponse.json();
      console.log(responseData); // Handle success response
  
    } catch (error) {
      console.error('Error enrolling in the course:', error);
      // Handle error - show an error message to the user
    }
  };
  
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
      {Array.isArray(courses) && courses.length > 0 && courses.map((course, index) => (
        <Courses
          id={course._id}
          title={course.name}
          description={course.description}
          image={course.image}
          onClick={() => handleCourseClick(course._id)} // Pass a function that calls handleCourseClick with course ID
        />)
      )}
    </div>
  );
};

const Courses = ({ id, title, description, image, onClick }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 5 }}>
      <CardActionArea onClick={onClick}> {/* Pass onClick handler */}
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
      <CardActions onClick={onClick}>
        <Button size="small" color="primary" startIcon={<SendIcon />}>
          enroll now
        </Button>
      </CardActions>
    </Card>
  );
};

export default AllCourses;
