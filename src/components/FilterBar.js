import React from 'react';
import { InputAdornment, Toolbar } from '@mui/material';
import { Search } from '@mui/icons-material';
import Input from './Input'



export default function FilterBar(props) {

    const { handleFilter } = props;

    var label = "Search Results"

    return (  
        <Toolbar>
            <Input 
                label={label}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    )
                }}
                sx={{
                    width : '75%'
                }}
                onChange={handleFilter}
            />
        </Toolbar>
    );
}

