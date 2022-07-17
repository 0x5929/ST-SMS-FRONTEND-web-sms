import React, { useState } from 'react'

import Components from '../../../components'
import { useQueryForm } from '../../../hooks'

function SearchStudents({ setQueryResults, handleBackdrop }) {
    console.log('SearchStudents feature rendered')
    const [ queryFormStates, queryFormHandlers ] = useQueryForm({setQueryResults, handleBackdrop})

    return (
        <Components.QueryForm
        queryFormStates={queryFormStates}
        queryFormHandlers={queryFormHandlers}
    />
    )
}

export default React.memo(SearchStudents)