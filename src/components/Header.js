import { Box , AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import Drawer from './Drawer';

function Header(props) {
    const {
      drawerOpen,
      setDrawerOpen,
      toggleDrawer,
      Link
    } = props
    
    return (     
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={()=>(toggleDrawer(drawerOpen))}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Student Mangement System
            </Typography>
            <Button color="inherit">
              Logout
            </Button>
            <Drawer 
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
              toggleDrawer={toggleDrawer}
              Link={Link}
            />
          </Toolbar>
        </AppBar>
      </Box>
     );
}

export default Header;