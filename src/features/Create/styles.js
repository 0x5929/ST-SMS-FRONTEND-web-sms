
import { styled } from '@mui/material/styles';
import Components from '../../components';




const Paper = styled(Components.Paper)(( {theme} ) => ({
    // styling paper if needed
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