import { Card, CardContent, Typography, Chip } from '@mui/material';

const CategoryCard = ({ category }) => {
  return (
    <Card sx={{ mb: 2, flexGrow: 1 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {category.name}
        </Typography>
        {category.parent_id && (
          <Chip 
            label={`Parent ID: ${category.parent_id}`} 
            size="small" 
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryCard;