import { Card, CardContent, Typography, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';


const CourseCard = ({ course }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {course.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {course.description.substring(0, 100)}...
        </Typography>
        <Box sx={{ mb: 1 }}>
          {course.category?.map((category) => (
            <Chip key={category.id} label={category.name} size="small" sx={{ mr: 1 }} />
          ))}
        </Box>
        <Button
          component={Link}
          to={`/courses/${course.id}`}
          variant="contained"
          size="small"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;