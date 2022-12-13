import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';

export default function PageNotFound({ Link }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
        <Stack>

            <img
              src="/404.jpg"
              alt=""
              width={500} height={250}
            />
            
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
               
            <Button variant="contained"><Link to="/">Back Home</Link></Button>
            

        </Stack>
    </Box>
  );
}