import { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';


export default function useTheme() {

    const ColorModeContext = createContext({ toggleColorMode: () => {}})
    const [ mode, setMode ] = useState('light')

    const colorMode = useMemo(
        () => ({
            toggleColorMode : () => {
              setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))  
            },
        })
    , [])    // empty array means this function is only computed for a value twice, once at mount and once at teardown


    // recreate theme everytime mode changes
    const appTheme = useMemo( () => createTheme({
        palette: {
          mode: mode,
          primary: {
              main: '#6d6daa',
          },
          secondary: {
              main: '#f50057'
          }
        },
      }), [mode])
    
    
    
    return {
        ColorModeContext,
        colorMode,
        ThemeProvider,
        appTheme
    }
}
