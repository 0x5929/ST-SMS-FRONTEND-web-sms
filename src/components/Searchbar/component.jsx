import React from 'react';
import { InputAdornment, Toolbar, TextField } from '@mui/material'
import { Clear as MuiClearIcon, Search as SearchIcon } from '@mui/icons-material'

import createSearchBarStyles from './styles'

const Styles = createSearchBarStyles({MuiClearIcon})

// NOTe that searchbar uses TextField from Mui instead of our custom Input
// This is so that we don;t have to be forced to use useValueInput hook, and can lift the value states up to its parent
// which is needed in this case due to the complexity of QueryForm. (also used for filter bar in results)
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
                inputRef={textInput}
                variant="outlined"
                color="primary"
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon data-testid="mui-searchicon" />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Styles.ClearIcon 
                                data-testid="mui-clearIcon"
                                onClick={() => handleClear(textInput, index, props.pk)}
                            />
                        </InputAdornment>
                    ),
                    "data-testid" : "mui-searchbar"
                }}

                {...(error && { error:true, helperText: error })}

                { ...others }
            />
        </Toolbar>
    );
}


export default React.memo(SearchBar)
