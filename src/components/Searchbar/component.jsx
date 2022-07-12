import React from 'react';
import { InputAdornment, Toolbar, TextField } from '@mui/material'
import { Clear as MuiClearIcon, Search as SearchIcon } from '@mui/icons-material'

import createSearchBarStyles from './styles'

const Styles = createSearchBarStyles({MuiClearIcon})

function SearchBar(props) {
    console.log('SearchBar component rendered')
    const { 
        textInput, 
        handleClear, 
        label, 
        index=0,

        ...others 
    } = props;
    
    return (  
        <Toolbar>
            <TextField 
                label={label}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Styles.ClearIcon 
                                onClick={() => handleClear(textInput, index, props.pk)}
                            />
                        </InputAdornment>
                    )
                }}
                inputRef={textInput}

                { ...others }
            />
        </Toolbar>
    );
}


export default React.memo(SearchBar)
