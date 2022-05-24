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
              default: darkMode ? '#1e202a' : '#f7f7f7',
              paper: darkMode ? '#1e202a' : '#f7f7f7',
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

            // custom view ports, anything smaller than tablet width is mobile
            mobile: 0,

            // starting from Amazon Kindle Fire 1st Gen width: 600px
            tablet: 600,

            // starting from Apple MacBook Pro 13-inch (Mid 2009 - Mid 2012): 1280px
            laptop: 1280,

            // starting any desktop monitor bigger than 17", reference: Apple MacBook Pro 17-inch (Mid/Late 2007 - Late 2011)
            desktop: 1920,

            // starting any monitor bigger than 49", reference: Apple iMac 21.5-inch (Retina 4K Display)
            tv: 4096
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