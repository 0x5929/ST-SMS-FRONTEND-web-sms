import React from 'react';

import { InputAdornment, Toolbar } from '@mui/material'

import { Clear as MuiClearIcon, Search as SearchIcon } from '@mui/icons-material'
import { Input } from '../Inputs'

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
            <Input 
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
