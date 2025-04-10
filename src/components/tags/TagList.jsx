import { Box } from '@mui/material';
import TagCard from './TagCard';

const TagList = ({ tags }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <TagCard key={tag.id} tag={tag} />
      ))}
    </Box>
  );
};

export default TagList;