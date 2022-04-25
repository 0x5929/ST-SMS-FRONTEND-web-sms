import { Box , AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import Drawer from './Drawer';

function Header(props) {
    const {
      drawerOpen,
      toggleDrawer,
      Link,
      anchorDirection, 
      menuIconColor,
      menuIconSize
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
              Link={Link}
              drawerOpen={drawerOpen}
              toggleDrawer={toggleDrawer}
              anchorDirection={anchorDirection}
              menuIconColor={menuIconColor}
              menuIconSize={menuIconSize}
            />
          </Toolbar>
        </AppBar>
      </Box>
     );
}

export default Header;