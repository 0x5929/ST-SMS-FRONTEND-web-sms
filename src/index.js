import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom'

import { App, PageNotFound } from './app'
import { RequiredAuth, PersistLogin, Signin } from './features/Auth'
import { Query } from './features/Query/Query'
import { Create } from './features/Create'

import { AuthContextProvider, AppThemeContextProvider } from './contexts'

ReactDOM.render(
<React.StrictMode>
    <AppThemeContextProvider>
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App Link={Link} Outlet={Outlet} />}>
                    <Route index element={<Signin />} />
                        <Route path="/query" element={
                            <PersistLogin>
                                <RequiredAuth>
                                    <Query />
                                </RequiredAuth>
                            </PersistLogin>} 
                        />
                        <Route path="/create" element={
                            <PersistLogin>
                                <RequiredAuth>
                                    <Create />
                                </RequiredAuth>
                            </PersistLogin>} 
                        />
                        <Route path="*" element={
                            <PageNotFound Link={Link} />
                        } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    </AppThemeContextProvider>
</React.StrictMode>,
  document.getElementById('root')
);


//import reportWebVitals from './reportWebVitals';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//reportWebVitals();
