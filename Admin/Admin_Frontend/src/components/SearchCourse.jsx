import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { Button, CardActionArea, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import './SearchCourse.css';

export default function SearchCourse() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [updatedCourseName, setUpdatedCourseName] = useState('');
  const [updatedCourseDescription, setUpdatedCourseDescription] = useState('');

  let storedStudentDetails = localStorage.getItem('student')
  try {
    storedStudentDetails = JSON.parse(storedStudentDetails);
  } catch (error) {
    console.log(error)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sdp-project-it065-066-11.onrender.com/showCourses');
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
      const response = await fetch('https://sdp-project-it065-066-11.onrender.com/searchCourse', {
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

  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(`https://sdp-project-it065-066-11.onrender.com/deleteCourse/${courseId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleUpdate = (courseId) => {
    const selected = courses.find(course => course._id === courseId);
    setSelectedCourse(selected);
    setUpdatedCourseName(selected.name);
    setUpdatedCourseDescription(selected.description);
    setIsUpdateFormOpen(true);
  };

  const handleUpdateFormClose = () => {
    setIsUpdateFormOpen(false);
  };

  const handleUpdateFormSubmit = async () => {
    try {
      const response = await fetch(`https://sdp-project-it065-066-11.onrender.com/updateCourse/${selectedCourse._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedCourseName,
          description: updatedCourseDescription,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update course');
      }
      // Refresh courses data after update
      const updatedCourses = await response.json();
      setCourses(updatedCourses);
      handleUpdateFormClose();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };


  return (
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
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}

            />
          ))
        ) : (
          <Typography>No courses found</Typography>
        )}
      </div>
      <Dialog open={isUpdateFormOpen} onClose={handleUpdateFormClose}>
        <DialogTitle>Update Course</DialogTitle>
        <DialogContent>
          <TextField
            label="Course Name"
            value={updatedCourseName}
            onChange={(e) => setUpdatedCourseName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={updatedCourseDescription}
            onChange={(e) => setUpdatedCourseDescription(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateFormClose}>Cancel</Button>
          <Button onClick={handleUpdateFormSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );


}

const Courses = ({ id, title, description, image, handleDelete, handleUpdate }) => {
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
        <Button size="small" color="primary" startIcon={<SendIcon />} onClick={() => handleDelete(id)} className="delete-button">
          DELETE
        </Button>
      </CardActions>
      <CardActions>
        <Button size="small" color="primary" startIcon={<SendIcon />} onClick={() => handleUpdate(id)} className="update-button">
          UPDATE
        </Button>
      </CardActions>
    </Card>
  );
};
