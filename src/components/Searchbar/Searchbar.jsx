import React from 'react';
import Styles from './styles'


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
                                onClick={() => handleClear(textInput, index)}
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

