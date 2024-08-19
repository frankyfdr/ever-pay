// src/components/NavBar.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#8fb6ab',
        borderRadius: 5,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Everpay
        </Typography>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to="/clients/create"
            sx={{
              ':hover': {
                bgcolor: '#8fb6ab',
                color: 'white',
              },
            }}
          >
            Create Client
          </MenuItem>

          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to="/payments/create"
            sx={{
              ':hover': {
                bgcolor: '#8fb6ab',
                color: 'white',
              },
            }}
          >
            Create Payment
          </MenuItem>
        </Menu>

        <Button color="inherit" component={Link} to="/clients">
          Clients
        </Button>
        <Button color="inherit" component={Link} to="/payments">
          Payments
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
