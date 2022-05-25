
import { styled } from '@mui/material/styles';
import Components from '../../components';




const Paper = styled(Components.Paper)(( {theme} ) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1e202a' : '#ffffff',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto'

}));

const Typography = styled(Components.BaseTypography)(( {theme} ) => ({
    marginBottom: theme.spacing(3)
}));



const Notification = styled(Components.Notification)(( {theme} ) => ({
    // styling Notification if needed
}));

const NotificationSlide = styled(Components.NotificationSlide)(( {theme} ) => ({
    // styling NotificationSlide if needed
}));

const StudentForm = styled(Components.StudentForm)(( {theme} ) => ({
    // styling NotificationSlide if needed
}));


const Styles = {
    Paper,
    Typography,
    StudentForm,
    Notification,
    NotificationSlide
}

export default Styles 