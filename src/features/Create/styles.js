
import { styled } from '@mui/material/styles';
import Controls from '../../components';




const Paper = styled(Controls.Paper)(( {theme} ) => ({
    // styling paper if needed
}));

const Typography = styled(Controls.BaseTypography)(( {theme} ) => ({
    marginBottom: theme.spacing(3)
}));



const Notification = styled(Controls.Notification)(( {theme} ) => ({
    // styling Notification if needed
}));

const NotificationSlide = styled(Controls.NotificationSlide)(( {theme} ) => ({
    // styling NotificationSlide if needed
}));

const StudentForm = styled(Controls.StudentForm)(( {theme} ) => ({
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