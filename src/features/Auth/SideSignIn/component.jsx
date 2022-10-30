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
import { useSignInForm } from '../../../hooks';
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
    
     const [ loginFormStates, loginFormHandlers ] = useSignInForm(useAuthContext())

     const {  
        inputRefs, 
        showEmailError,
        signInFormValidations, 
        showPwError, 
        clearEmailField, 
        clearPwField, 
        user 
    } = loginFormStates
    
     const { handleSubmit, handleClearText } = loginFormHandlers
    
    
    return (
            <Styles.MainGrid container component="main">
                <CssBaseline />
                <Styles.ImageGrid
                    data-testid="mui-imagegrid"

                    item
                    tablet={4}
                    laptop={7}
                />
                <MuiGrid 
                    data-testid="mui-formgrid"

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
                            <LockOutlinedIcon data-testid="lockedout-icon" />
                        </Styles.Avatar>
                        <Components.BaseTypography 
                            component="h1" 
                            variant="h5"
                            text="Sign in"
                        />
                        <Styles.FormBox 
                            component="form" 
                            noValidate 
                            onSubmit={handleSubmit} 
                        >
                            <Components.Input
                                required
                                fullWidth
                                ref={inputRefs.email}
                                margin="normal"
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                initialValue={() => user ? user.email :  ''}
                                showError={showEmailError}
                                clearFields={clearEmailField}
                                errorHandler={signInFormValidations.email}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Styles.ClearIcon 
                                                data-testid="clear-email-icon"
                                                onClick={()=>(handleClearText('email'))}
                                            />
                                        </InputAdornment>
                                    )
                                }}

                                data-testid="login-email-input"
                            />
                            <Components.Input 
                                required
                                fullWidth
                                ref={inputRefs.password}
                                margin="normal"
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                initialValue={() => user? user.password: ''}
                                showError={showPwError}
                                clearFields={clearPwField}
                                errorHandler={signInFormValidations.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Styles.ClearIcon 
                                                data-testid="clear-pw-icon"
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