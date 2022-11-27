import { styled } from '@mui/material'


function createSigninStyles(components){

    const {
        MuiGrid,
        MuiBox,
        MuiAvatar,
        MuiClearIcon,
        BaseButton,
        BaseCopyright
    } = components


    const MainGrid = styled(MuiGrid)(( {theme} ) => ({
        height: '100vh' 
    }));

    const ImageGrid = styled(MuiGrid)(( {theme} ) => ({
        backgroundImage: 'url(https://picsum.photos/1200/2400)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }));

    const SignInBox = styled(MuiBox)(( {theme} ) => ({
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }));
    
    const Avatar = styled(MuiAvatar)(( {theme} ) => ({
        margin: theme.spacing(1),
        backgroundColor: 'secondary.main'
    }));

    const FormBox = styled(MuiBox)(( {theme} ) => ({
        marginTop: theme.spacing(1)
    }));

    const ClearIcon = styled(MuiClearIcon)(( {theme} ) => ({
        ':hover' : {
            cursor: 'pointer'
        }
    }));

    const Button = styled(BaseButton)(( {theme} ) => ({
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
    }));

    const Copyright = styled(BaseCopyright)(( {theme} ) => ({
        marginTop: theme.spacing(5)
    }));

    return {
        MainGrid,
        ImageGrid,
        SignInBox,
        Avatar,
        FormBox,
        ClearIcon,
        Button,
        Copyright
    }

}

export default createSigninStyles