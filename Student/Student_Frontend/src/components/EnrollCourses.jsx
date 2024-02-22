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
    const studnetId = storedStudentDetails._id;

    useEffect(() => {
        const fetchData = async (studnetId) => {
            try {
                const response = await fetch(`http://localhost:4850/showEndrolledCourses/${studnetId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setEnrolledCourses(data)
                console.log(Array.isArray(enrolledCourses))
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(studnetId);

    }, []);
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* {Array.isArray(enrolledCourses) ? (
            enrolledCourses.map((enrolledCourse) => (
                <Courses
                    key={enrolledCourse._id}
                    id={enrolledCourse._id}
                    title={enrolledCourse.name}
                    description={enrolledCourse.description}
                    image={enrolledCourse.image}
                />
            ))
        ) : (
            <Typography>No courses found</Typography>
        )} */}
        {/* {
            enrolledCourses.forEach((enrollCourse)=>(
                enrollCourse.map((course)=>(
                    <Courses
                        key={course._id}
                        id={course._id}
                        title={course.name}
                        description={course.description}
                        image={course.image}
                    />
                ))
            ))
        } */}
    </div>
    );
};


const Courses = ({ id, title, description, image }) => {
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
        </Card>
    );
}

export default CoursesRow;