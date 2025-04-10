import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const TagCard = ({ tag }) => {
  return (
    <Chip
      component={Link}
      to={`/tags/${tag.id}`}
      label={tag.name}
      clickable
      sx={{ m: 1 }}
    />
  );
};

export default TagCard;