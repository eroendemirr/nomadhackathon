import React from 'react';
import { Toolbar, IconButton, Typography, AppBar } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import styled from '@mui/material/styles/styled';

const StyledAppBar = styled(AppBar)(() => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
}));

const Navbar = ({ isConnected, userAddress }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          📚 The Reading World of Blockchain
        </Typography>
        {isConnected && (
          <Typography variant="body2" color="inherit">
            {userAddress}
          </Typography>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar; 