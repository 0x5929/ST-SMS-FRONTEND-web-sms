import { createContext, useState, useMemo, useContext } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';

const AppThemeContext = createContext({
  toggleColorMode: () => {},
  mode: null
});


const AppThemeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
  
    const toggleColorMode = () => {
        setDarkMode(!darkMode);
    };


  // recreate theme everytime mode changes
  const appTheme = useMemo(
    () =>
      createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            background: {
              default: darkMode ? '#1e202a' : '#e6e6e6',
              paper: darkMode ? '#1e202a' : '#e6e6e6',
            },

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
        breakpoints: {
          values: {
            mobile: 0,
            tablet: 600,
            laptop: 1280,
            desktop: 1920,
            tv: 2880
          }
        }
      }),
    [darkMode]
  );

  return (
    <AppThemeContext.Provider
      value={{
        toggleColorMode,
        darkMode
      }}
    >
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            { children }
        </ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(AppThemeContext);

export default AppThemeContextProvider;