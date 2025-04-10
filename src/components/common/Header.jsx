import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Course Management
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/courses">Courses</Button>
        <Button color="inherit" component={Link} to="/categories">Categories</Button>
        <Button color="inherit" component={Link} to="/tags">Tags</Button>
        <Button color="inherit" component={Link} to="/stats">Stats</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;