import React, { useState, useCallback } from "react"
import { Box as MuiBox, Paper as MuiPaper } from '@mui/material'; 

import { createQueryStyles } from './styles'
import Statistics  from './Statistics'
import SearchStudents from './SearchStudents'
import { QueryResults } from '../Results'
import Components from '../../../components'
import { useToggle } from '../../../hooks' 


const Styles = createQueryStyles({ MuiPaper, MuiBox })

function Query() {

    console.log('Query feature rendered')
    const [ queryResults, setQueryResults ] = useState([])
    const [ showResults, setShowResults ] = useToggle(false)
    const [ isBackdropOpen, setIsBackdropOpen ] = useToggle(false)

    const handleBackdrop = useCallback(() =>{

        setIsBackdropOpen(true)

        // in 1 second of time, close backdrop, show results
        // but when connecting to back end, we will wait until results are fetched
        setTimeout(()=> {
            setIsBackdropOpen(false)
            setShowResults(true)

        }, 1000)

    }, [])

    const handleBacktoQuery = useCallback(() => {
        setShowResults(false)
        setIsBackdropOpen(false)
    }, [])

    return (
        <Styles.Paper>
            {            
                !showResults &&

                <>
                    <SearchStudents 
                        setQueryResults={setQueryResults}
                        handleBackdrop={handleBackdrop}
                    />
                    <Styles.Box>
                        <Statistics />
                    </Styles.Box>
                    <Components.SimpleBackDrop 
                        openBackdrop={isBackdropOpen}
                    />
                </>
            }
            {
                showResults &&  
                <QueryResults 
                    queryResults={queryResults}
                    handleBacktoQuery={handleBacktoQuery}
                />
            }
        </Styles.Paper>
    )
}

export default React.memo(Query)