import React from 'react';
import { InputAdornment, Toolbar } from '@mui/material';
import { Search } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import { Input } from './Inputs'

import { styled } from '@mui/material';

const ClearText = styled(ClearIcon)(()=>({

    ':hover' : {
        cursor: 'pointer'
    }
}))


export default function SearchBar(props) {

    const { textInput, handleClear, label, ...others } = props;
    
    return (  
        <Toolbar>
            <Input 
                label={label}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <ClearText 
                                onClick={() => handleClear(textInput)}
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

