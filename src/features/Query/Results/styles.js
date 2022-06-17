import { styled } from '@mui/material/styles';


function createResultsStyles({MuiBox, BaseSearchBar, BaseQueryTblContainer, BaseDetailedTblContainer}){
    const Box = styled(MuiBox)(( {theme} ) => ({
        display: 'flex',
        justifyContent: 'flex-end'
    }));

    const SearchBar = styled(BaseSearchBar)(( {theme} ) => ({
        flexGrow: 0
    }));

    const QueryTblContainer = styled(BaseQueryTblContainer)(( {theme} ) => ({
        "::selection, *::selection": {
            backgroundColor: theme.palette.mode === 'light' ? "#ffe20b" : 'undefined'
          },
    
    }));

    const DetailedTblContainer = styled(BaseDetailedTblContainer)(( {theme} ) => ({
        "::selection, *::selection": {
            backgroundColor: theme.palette.mode === 'light' ? "#ffe20b" : 'undefined'
          },
    
    }));

    return {
        Box,
        SearchBar,
        QueryTblContainer,
        DetailedTblContainer
    }
}

export default createResultsStyles