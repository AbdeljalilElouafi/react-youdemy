import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Box, Chip } from '@mui/material';
import api from '../services/api';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!course) return <Typography>Course not found</Typography>;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {course.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {course.description}
      </Typography>
      <Box sx={{ my: 2 }}>
        <Typography variant="body1" gutterBottom>
          <strong>Mentor:</strong> {course.mentor?.name || 'Unknown'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Category:</strong> {course.category?.name || 'Uncategorized'}
        </Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="body2" gutterBottom>
          <strong>Tags:</strong>
        </Typography>
        {course.tags?.map((tag) => (
          <Chip key={tag.id} label={tag.name} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>
    </Paper>
  );
};

export default CourseDetail;