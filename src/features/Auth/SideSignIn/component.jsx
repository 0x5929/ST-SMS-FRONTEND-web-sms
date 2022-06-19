import React from 'react'

import { 
    Grid as MuiGrid, 
    CssBaseline,
    Box as MuiBox,
    Avatar as MuiAvatar,
    FormControlLabel,
    Checkbox,
    Paper,
    InputAdornment } from '@mui/material';

import { 
    LockOutlined as LockOutlinedIcon, 
    Clear as MuiClearIcon, } from '@mui/icons-material';


import createSigninStyles from './styles'
import { Copyright as BaseCopyright } from '../Copyright'
import { useLogin } from '../../../hooks';
import { useAuthContext } from '../../../contexts';


import Components from '../../../components';

const Styles = createSigninStyles({
    MuiGrid,
    MuiBox,
    MuiAvatar,
    MuiClearIcon,
    BaseButton: Components.BaseButton,
    BaseCopyright
})

function Signin (){

     const [ loginStates, loginHandlers ] = useLogin(useAuthContext())
    
     const { creds, errors } = loginStates
     const { handleLogin, handleOnChange, handleClearText } = loginHandlers
    
    return (
            <Styles.MainGrid container component="main">
                <CssBaseline />
                <Styles.ImageGrid
                    item
                    tablet={4}
                    laptop={7}
                />
                <MuiGrid 
                    item 
                    mobile={12} 
                    tablet={8} 
                    laptop={5} 
                    component={Paper} 
                    elevation={6} 
                    square
                >
                    <Styles.SignInBox>
                        <Styles.Avatar>
                            <LockOutlinedIcon />
                        </Styles.Avatar>
                        <Components.BaseTypography 
                            component="h1" 
                            variant="h5"
                            text="Sign in"
                        />
                        <Styles.FormBox 
                            component="form" 
                            noValidate 
                            onSubmit={handleLogin} 
                        >
                        <Components.Input
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={creds.email}
                            onChange={handleOnChange}
                            error={errors.email}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Styles.ClearIcon 
                                            onClick={()=>(handleClearText('email'))}
                                        />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Components.Input
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={creds.password}
                            onChange={handleOnChange}
                            error={errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Styles.ClearIcon 
                                            onClick={()=>(handleClearText('password'))}
                                        />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <FormControlLabel
                            control=
                                {<Checkbox 
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
                </MuiGrid>
            </Styles.MainGrid>
    )
}


export default React.memo(Signin)