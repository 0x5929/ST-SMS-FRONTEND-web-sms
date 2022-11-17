import React, { useState } from "react"
import { Box as MuiBox, Paper as MuiPaper } from '@mui/material'; 

import { createQueryStyles } from './styles'
import Statistics  from './Statistics'
import SearchStudents from './SearchStudents'
import { QueryResults } from '../Results'
import Components from '../../../components'
import { useToggle, useCircularProgress } from '../../../hooks' 


const Styles = createQueryStyles({ MuiPaper, MuiBox })

function Query() {
    const [ queryResults, setQueryResults ] = useState([])
    const [ progressOn, handleSetProgressStatus ] = useCircularProgress()
    const [ showResults, setShowResults ] = useToggle(false)

    return (
        <Styles.Paper>
            {            
                !showResults &&

                <>
                    <SearchStudents 
                        setQueryResults={setQueryResults}
                        setShowResults={setShowResults}
                        handleSetProgressStatus={handleSetProgressStatus}
                    />
                    <Styles.Box>
                        <Statistics />
                    </Styles.Box>
                    <Components.SimpleBackDrop 
                        openBackdrop={progressOn}
                    />
                </>
            }
            {
                showResults &&  
                <QueryResults 
                    queryResults={queryResults}
                    handleSetProgressStatus={handleSetProgressStatus}
                    setShowResults={setShowResults}
                />
            }
        </Styles.Paper>
    )
}

export default React.memo(Query)