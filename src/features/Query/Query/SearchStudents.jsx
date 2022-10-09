import React from 'react'
import { Box } from '@mui/material'

import Components from '../../../components'
import { useQueryForm } from '../../../hooks'

function SearchStudents({ setQueryResults, handleBackdrop }) {
    const [ queryFormStates, queryFormHandlers ] = useQueryForm({setQueryResults, handleBackdrop})

    return (
        <Box data-testid="search-student-component">
            <Components.QueryForm
                queryFormStates={queryFormStates}
                queryFormHandlers={queryFormHandlers}
            />
        </Box>
    )
}

export default React.memo(SearchStudents)