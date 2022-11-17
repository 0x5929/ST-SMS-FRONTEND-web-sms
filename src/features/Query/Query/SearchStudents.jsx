import React from 'react'
import { Box } from '@mui/material'

import Components from '../../../components'
import { useQueryForm } from '../../../hooks'

function SearchStudents({ setQueryResults, setShowResults, handleSetProgressStatus }) {
    const [ queryFormStates, queryFormHandlers ] = useQueryForm({setQueryResults, setShowResults, handleSetProgressStatus})

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