import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FavoriteList from './FavoriteList';
import { Link } from 'react-router-dom'

const navItems = ['Favorites', 'About', 'Contact'];

export const Header = ({ onThemeChange, themeMode }) => {

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex', marginBottom: 20 }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          {themeMode === 'light' ? 
          <IconButton onClick={() => onThemeChange('dark')}>
            <DarkModeIcon />
          </IconButton> : 
          <IconButton onClick={() => onThemeChange('light')}>
          <LightModeIcon />
          </IconButton>}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link className="link" to={'/'} >MUI</Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Link className='link' to={'/favorites'}>Favorites</Link>
            {/* {navItems.map((item) => (
              <Button onClick={} key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))} */}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
