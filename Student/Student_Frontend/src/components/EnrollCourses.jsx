// EnrollCourses.js
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './EnrollCourses.css';

const EnrollCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const navigate = useNavigate();

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

    const navigateToVideoPage = (videoId) => {
        navigate(`/video/${videoId}`); // Navigate to VideoPlayerPage with videoId as URL parameter
    };

    const unEnrollCourse = async (courseId) => {
        console.log('Clicked on course with ID:', courseId);
        // Your unenroll course logic here
    };

    return (
        <div className="enrolled-courses-container">
            {enrolledCourses.length > 0 ? (
                enrolledCourses.map((course) => (
                    <Courses
                        key={course._id}
                        id={course._id}
                        title={course.name}
                        description={course.description}
                        image={course.image}
                        videoLink={course.link}
                        navigateToVideoPage={() => navigateToVideoPage(getVideoIdFromLink(course.link))}
                        unEnroll={() => unEnrollCourse(course._id)}
                    />
                ))
            ) : (
                <Typography>No courses found</Typography>
            )}
        </div>
    );
};

const getVideoIdFromLink = (link) => {
    const parts = link.split('/');
    const lastPart = parts[parts.length - 1];
    const videoId = lastPart.split('?')[0];
    
    console.log(videoId);
    return videoId;
};


const Courses = ({ id, title, description, image, videoLink, navigateToVideoPage, unEnroll }) => {
    return (
        <Card className="course-card">
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
            <CardActions className="course-actions">
                <Button size="small" color="primary" startIcon={<SendIcon />} onClick={navigateToVideoPage}>
                    Start Watching
                </Button>
                <Button size="small" color="primary" startIcon={<SendIcon />} onClick={unEnroll}>
                    Unenroll
                </Button>
            </CardActions>
        </Card>
    );
};

export default EnrollCourses;
