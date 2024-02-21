import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { Button, CardActionArea, CardActions, TextField } from '@mui/material';

export default function SearchCourse() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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

  return (
    <div>
      <TextField
        label="Search Course"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleSearch} disabled={isSearching}>
        Search
      </Button>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
        {Array.isArray(searchResult) && searchResult.length > 0 ? (
          searchResult.map((course) => ( //If any course availabe then this
            <Courses
              key={course._id}
              id={course._id}
              title={course.name}
              description={course.description}
              image={course.image}
            />
          ))
        ) : ( // Else This
          <Typography>No courses found</Typography>
        )}
      </div>
    </div>
  );
};

const Courses = ({ id, title, description, image }) => {
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
        <Button size="small" color="primary" startIcon={<SendIcon />}>
          Enroll Now
        </Button>
      </CardActions>
    </Card>
  );
};

