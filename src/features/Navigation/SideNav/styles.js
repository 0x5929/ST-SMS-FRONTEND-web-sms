import { styled } from '@mui/material/styles';


function createSideNavStyles({MuiList, MuiListItem, MuiListItemText}){
    const List = styled(MuiList)(( {theme} ) => ({
        width: theme.spacing(31.25),
    }));

    const FirstListItem = styled(MuiListItem)(( {theme} ) => ({
        marginTop: theme.spacing(7)
    }));
    
    const ListItemText = styled(MuiListItemText)(( {theme} ) => ({
        '& .MuiTypography-root' : {
            color: theme.palette.text.primary
        }
    }));

    return { List, FirstListItem, ListItemText }
}

export default createSideNavStyles