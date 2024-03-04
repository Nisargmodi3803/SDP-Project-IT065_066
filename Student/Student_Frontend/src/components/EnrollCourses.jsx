import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Lectures from './Lectures';
import { useNavigate } from 'react-router-dom'

import { Button, CardActionArea, CardActions } from '@mui/material';

// Container component to hold the cards in a row
const CoursesRow = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([])
    let storedStudentDetails = localStorage.getItem('student')
    try {
        storedStudentDetails = JSON.parse(storedStudentDetails);
    } catch (error) {
        console.log(error)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedStudentDetails = JSON.parse(localStorage.getItem('student'));
                const studentId = storedStudentDetails._id;
                const response = await fetch(`http://localhost:4850/showEndrolledCourses/${studentId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log("Fetched data:", data);
                setEnrolledCourses(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    const unEnrollCourse = async (courseId) => {
        console.log('Clicked on course with ID:', courseId);
        const studentId = storedStudentDetails._id;
    
        try {
            const response = await fetch(`http://localhost:4450/unEnrollCourse/${studentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ courseId })
            });
    
            if (!response.ok) {
                throw new Error('Failed to unenroll from the course');
            }
    
            const data = await response.json();
            console.log('Successfully unenrolled from the course:', data);
            alert("Course unenrolled successfull")
            window.location.reload();
            
        } catch (error) {
            console.error('Error unenrolling from the course:', error);
        }
    }
    

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
            {enrolledCourses.length > 0 ? (
                enrolledCourses.map((course) => (
                    <Courses
                        key={course._id}
                        id={course._id}
                        title={course.name}
                        description={course.description}
                        image={course.image}
                        unEnroll={() => unEnrollCourse(course._id)}
                    />
                ))
            ) : (
                <Typography>No courses found</Typography>
            )}
        </div>
    );
};


const Courses = ({ id, title, description, image, unEnroll }) => {
    const navigate = useNavigate()
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
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
                <Button size="small" color="primary" startIcon={<SendIcon />} onClick={() => {
                    navigate('watch')
                }}>
                    Start Watching
                </Button>
            </CardActions>

            <CardActions>
                <Button size="small" color="primary" startIcon={<SendIcon />} onClick={unEnroll}>
                    unEnroll
                </Button>
            </CardActions>
        </Card>
    );
}

export default CoursesRow;
