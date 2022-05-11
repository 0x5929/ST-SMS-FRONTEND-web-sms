import { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';


export default function useTheme() {

    const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: null})
    const [ mode, setMode ] = useState('light')

    const colorMode = useMemo(
        () => ({
            toggleColorMode : () => {
              setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))  
            },
        })
    , [])    // empty array means this function is only computed for a value twice, once at mount and once at teardown


    // recreate theme everytime mode changes
    const appTheme = useMemo( () => (createTheme({
        palette: {
          mode: mode,
          primary: {
              main: '#6d6daa',
          },
          secondary: {
            main: '#aaaa6d',
          },
          error: {
            main: '#aa6d6d',
          },
          success: {
            main: '#6daa6d',
          },
          info: {
            main: '#6daaaa',
          },
        },
      })), [mode])
    
    
    
    return {
        ColorModeContext,
        colorMode,
        ThemeProvider,
        appTheme
    }
}
