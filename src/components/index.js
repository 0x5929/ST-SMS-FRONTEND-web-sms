import Header from './Header/Header'
import Form from './Form/Form';
import Paper from './Paper/Paper';
import { StudentFormGrid, QueryLayoutGrid } from './Grid';
import SearchBar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import BaseTypography from './Typography/Typography';
import BaseButton from './Button/Button'
import ConfirmDialog from './ConfirmDialog/ConfirmDialog';
import Notification from './Notification/Notification'
import NotificationSlide  from './Notification/NotificationSlide'

import { 
    QueryTblContainer, 
    QueryTblHead, 
    QueryTblBody, 
    QueryTblPagination, 
    DetailedTblContainer, 
    DetailedTblHead, 
    DetailedTblBody
} from './Table'

// export components controls for dev to be used outside of the componenet folder
const Controls = {
    Header,
    BaseButton,
    Form,
    Paper,
    QueryTblContainer,
    QueryTblHead,
    QueryTblBody,
    QueryTblPagination,
    DetailedTblContainer,
    DetailedTblHead,
    DetailedTblBody,
    StudentFormGrid,
    QueryLayoutGrid,
    SearchBar,
    Modal,
    BaseTypography,
    Notification,
    NotificationSlide,
    ConfirmDialog
}

export default Controls
 