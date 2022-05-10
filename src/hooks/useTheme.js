import { ThemeProvider, createTheme } from '@mui/material/styles';


export default function useTheme() {
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
              main: '#6d6daa',
          },
          secondary: {
              main: '#f50057'
          }
        },
      });
    
    
    return {
        ThemeProvider,
        darkTheme
    }
}
