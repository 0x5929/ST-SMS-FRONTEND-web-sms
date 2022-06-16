import { styled } from '@mui/material';

function getCommonStyles({MuiStack, MuiBox}){

    const Stack = styled(MuiStack)(( {theme} ) => ({
        width: '90%'
    }));

    const ButtonContainerBox = styled(MuiBox)(( {theme} ) => ({
        display: 'flex', 
        alignItems: 'center'
    }));

    return {
        Stack,
        ButtonContainerBox
    }
}

function createStudentFormStyles(components){

    const { 

        MuiStack, 
        BaseIconButton, 
        MuiBox, // used for mulitple Box instances
        BaseFab,
        BaseModal,
        MuiCircularProgress // // used for mulitple CircularProgress instances
    
    } = components

    const {
        Stack,
        ButtonContainerBox
    
    } = getCommonStyles({MuiStack, MuiBox})

    const StudentForm = styled('form')(( {theme} ) => ({
        // FORM ELEMENT
        '& .MuiFormControl-root':{    
            width: '80%',
            margin: theme.spacing(1)
        },
    
    }));

    const AddRotBtn = styled(BaseIconButton)(( {theme} ) => ({
        borderRadius: theme.spacing(1),
    
    }));


    const ButtonBox = styled(MuiBox)(( {theme} ) => ({
        position: 'relative'
    }));

    const SuccessFab = styled(BaseFab)(( {theme} ) => ({
        backgroundColor: theme.palette.success.main,
    
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        },
    }));

    const Modal = styled(BaseModal)(( {theme} ) => ({
        margin: 'auto',
        width: '30%'
    }));
    
    const CircularProgress = styled(MuiCircularProgress)(( {theme} ) => ({
        color: theme.palette.success.main,
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    }));

    const ButtonCircularProgress = styled(MuiCircularProgress)(( {theme} ) => ({
        color: theme.palette.success.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
    }));

    return {
        StudentForm,
        Stack,
        AddRotBtn,
        ButtonContainerBox,
        ButtonBox,
        SuccessFab,
        Modal,
        CircularProgress,
        ButtonCircularProgress
    }

}

function createAddRotFormStyles({MuiStack, MuiBox}){

    const {Stack, ButtonContainerBox} = getCommonStyles({MuiStack,MuiBox})

    const AddRotForm = styled('form')(( { theme } ) => ({
        '& .MuiFormControl-root':{    
            width: '100%',
            margin: theme.spacing(1),
        }
    }));
    
    return {
        AddRotForm,
        Stack,
        ButtonContainerBox
    }    
    
}

function createQueryFormStyles({SearchBar, BaseSelect, BaseButton, BaseIconButton}){
    const QueryForm = styled('form')(( {theme} ) => ({
        // FORM ELEMENT
        '& .MuiFormControl-root':{    
            width: '80%',
            margin: theme.spacing(1)
        }
    }));

    const QuerySearchBar = styled(SearchBar)(( {theme} ) => ({
        flexGrow: 1,
        width: 100,
        fullWidth: true,
        marginLeft: theme.spacing(0)
    }));

    const QuerySelect = styled(BaseSelect)(( {theme} ) => ({
        fontSize: 15,
    
        [theme.breakpoints.up('mobile')] : {
            marginLeft: theme.spacing(2)
        },
    
        [theme.breakpoints.down('tablet')] : {
            marginBottom: theme.spacing(2)
        }
    }));

    const AddButton = styled(BaseButton)(( {theme} ) => ({
        borderRadius: theme.spacing(1),
        marginTop: theme.spacing(1.5),
        marginLeft: theme.spacing(3),
        fontSize: theme.spacing(2),
    
    }));
    
    const DelButton = styled(BaseButton)(( {theme} ) => ({
        borderRadius: theme.spacing(1),
        margin: theme.spacing(0),
        marginTop: theme.spacing(1.5),
        marginLeft: theme.spacing(0),
    
    }));
    
    const QueryButton = styled(BaseIconButton)(( {theme} ) => ({
        borderRadius: theme.spacing(1),
        marginTop: theme.spacing(1.5),
        marginLeft: theme.spacing(3),
        fontSize: theme.spacing(2),
    
    }));

    return {
        QueryForm,
        QuerySearchBar,
        QuerySelect,
        DelButton,
        AddButton,
        QueryButton
    }
}


export { createStudentFormStyles, createAddRotFormStyles, createQueryFormStyles }