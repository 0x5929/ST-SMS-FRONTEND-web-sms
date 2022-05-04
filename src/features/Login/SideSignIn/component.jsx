import React from 'react';
import Styles from './styles'

import { useLogin } from '../../../hooks';

export default function Signin (props){

    const { 
        AuthContext,

     } = props

     const { 
        handleLogin
    } = useLogin(AuthContext)


    // we could also refactor this into a useLogin hook abstraction, if this grows?
    
    return (
            <Styles.MainGrid container component="main">
                <Styles.CssBaseline />
                <Styles.ImageGrid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                />
                <Styles.Grid 
                    item xs={12} 
                    sm={8} 
                    md={5} 
                    component={Styles.Paper} 
                    elevation={6} 
                    square
                >
                    <Styles.SignInBox>
                        <Styles.Avatar>
                            <Styles.LockOutlined />
                        </Styles.Avatar>
                        <Styles.Typography 
                            component="h1" 
                            variant="h5"
                            text="Sign in"
                        />
                        <Styles.FormBox 
                            component="form" 
                            noValidate 
                            onSubmit={handleLogin} 
                        >
                        <Styles.TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Styles.TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Styles.FormControlLabel
                            control=
                                {<Styles.Checkbox 
                                    value="remember" 
                                    color="primary" 
                                />}
                            label="Remember me"
                        />
                        <Styles.Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            text="Sign In"
                        />
                        <Styles.Copyright />
                        </Styles.FormBox>
                    </Styles.SignInBox>
                </Styles.Grid>
            </Styles.MainGrid>
    )
}