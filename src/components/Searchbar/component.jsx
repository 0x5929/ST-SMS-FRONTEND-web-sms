import React from 'react';
import Styles from './styles'

// consider changing handleClear logic, feels too complicated, related files: 
// component-QueryForm.jsx, componenets/Searchbar/component.jsx, hooks/useValidations.js and hooks/useQuery.js
export default function SearchBar(props) {

    const { 
        textInput, 
        handleClear, 
        label, 
        index=0,
        ...others 
    } = props;
    
    return (  
        <Styles.Toolbar>
            <Styles.Input 
                label={label}
                InputProps={{
                    startAdornment: (
                        <Styles.InputAdornment position="start">
                            <Styles.SearchIcon />
                        </Styles.InputAdornment>
                    ),
                    endAdornment: (
                        <Styles.InputAdornment position="end">
                            <Styles.ClearIcon 
                                onClick={() => handleClear(textInput, index, props.pk)}
                            />
                        </Styles.InputAdornment>
                    )
                }}
                inputRef={textInput}

                { ...others }
                
            />
        </Styles.Toolbar>
    );
}

