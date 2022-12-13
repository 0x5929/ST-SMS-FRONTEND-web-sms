import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';

const ascii = `
                                                       
                                                       
       444444444       000000000            444444444  
      4::::::::4     00:::::::::00         4::::::::4  
     4:::::::::4   00:::::::::::::00      4:::::::::4  
    4::::44::::4  0:::::::000:::::::0    4::::44::::4  
   4::::4 4::::4  0::::::0   0::::::0   4::::4 4::::4  
  4::::4  4::::4  0:::::0     0:::::0  4::::4  4::::4  
 4::::4   4::::4  0:::::0     0:::::0 4::::4   4::::4  
4::::444444::::4440:::::0 000 0:::::04::::444444::::444
4::::::::::::::::40:::::0 000 0:::::04::::::::::::::::4
4444444444:::::4440:::::0     0:::::04444444444:::::444
          4::::4  0:::::0     0:::::0          4::::4  
          4::::4  0::::::0   0::::::0          4::::4  
          4::::4  0:::::::000:::::::0          4::::4  
        44::::::44 00:::::::::::::00         44::::::44
        4::::::::4   00:::::::::00           4::::::::4
        4444444444     000000000             4444444444
                                                       
                                                       
                                                       
                                                       
                                                       
                                                       
                                                       
`


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

            <Typography variant="pre">
              {ascii}
            </Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Link to="/">
                <Button variant="contained">Back Home</Button>
            </Link>

        </Stack>
    </Box>
  );
}