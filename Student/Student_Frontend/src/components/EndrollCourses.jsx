import * as React from 'react';
import { useState,useEffect } from 'react';
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
    let storedStudentDetails = localStorage.getItem('student')
    try {
        storedStudentDetails = JSON.parse(storedStudentDetails);
    } catch (error) {
        console.log(error)
    }
    const studnetId = storedStudentDetails._id;

    const [endrolledCourses,setEndrolledCourses] = useState([])
    useEffect(() => {
        const fetchData = async (studnetId) => {
            try {
                const response = await fetch(`http://localhost:4850/showEndrolledCourses/${studnetId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setEndrolledCourses(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(studnetId);

    }, []);
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Courses
                title="Web Design"
                description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica."
                image="https://www.google.com/imgres?imgurl=https%3A%2F%2Fnearlearn.com%2Fpublic%2Fimages%2Fpython-training-for-beginners.jpg&tbnid=tgmLr-IWuPBmQM&vet=12ahUKEwjNrZHww7CEAxWzTGwGHUcHB_sQMygbegUIARCuAQ..i&imgrefurl=https%3A%2F%2Fnearlearn.com%2Fpython-online-training-usa&docid=gaFrd5se0BCg2M&w=500&h=500&q=image%20for%20python%20course&ved=2ahUKEwjNrZHww7CEAxWzTGwGHUcHB_sQMygbegUIARCuAQ"
            />
        </div>
    );
};


const Courses = ({ title, description, image }) => {
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