import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { Button, CardActionArea, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [updatedCourseName, setUpdatedCourseName] = useState('');
  const [updatedCourseDescription, setUpdatedCourseDescription] = useState('');

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

  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:4150/deleteCourse/${courseId}`, {
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
      const response = await fetch(`http://localhost:4160/updateCourse/${selectedCourse._id}`, {
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
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
      {Array.isArray(courses) && courses.length > 0 ? (
        courses.map((course) => ( //If any course availabe then this
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
      ) : ( // Else This
        <Typography>No courses found</Typography>
      )}

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
};

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
        <Button size="small" color="primary" startIcon={<SendIcon />} onClick={() => handleDelete(id)}>
          DELETE
        </Button>
      </CardActions>

      <CardActions>
        <Button size="small" color="primary" startIcon={<SendIcon />} onClick={() => handleUpdate(id)}>
          UPDATE
        </Button>
      </CardActions>
    </Card>
  );
};

export default AllCourses;
