import React from 'react';
import { InputAdornment, Toolbar, TextField } from '@mui/material'
import { Clear as MuiClearIcon, Search as SearchIcon } from '@mui/icons-material'

import createSearchBarStyles from './styles'

const Styles = createSearchBarStyles({MuiClearIcon})

function SearchBar(props) {
    console.log('SearchBar component rendered')
    const { 
        index=0,
        name,
        label, 
        value,
        error=null,
        onChange,
        textInput, 
        handleClear, 

        ...others 
    } = props;
    
    return (  
        <Toolbar>
            <TextField 
                variant="outlined"
                color="primary"
                label={label}
                name={name}
                value={value}
                onChange={onChange}
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
                {...(error && { error:true, helperText: error })}

                { ...others }
            />
        </Toolbar>
    );
}


export default React.memo(SearchBar)
