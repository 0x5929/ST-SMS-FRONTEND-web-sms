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
    const [ queryResults, setQueryResults ] = useState([])
    const [ showResults, setShowResults ] = useToggle(false)
    const [ isBackdropOpen, setIsBackdropOpen ] = useToggle(false)

    const handleBackdrop = useCallback(() =>{
        console.log('HNDLE BACKDROP?')
        setIsBackdropOpen(true)

        // in 1 second of time, close backdrop, show results
        // but when connecting to back end, we will wait until results are fetched

        setTimeout(()=> {
        
            console.log('THIS IS RUNNING FOREVER?')
            setIsBackdropOpen(false)
            setShowResults(true)
            console.log('SETSHOWRESULTS SHOULD BE TRUE?', showResults)

        }, 1000)

        console.log('after timeout, i am never there', isBackdropOpen, showResults)

    }, [setIsBackdropOpen, setShowResults])

    const handleBacktoQuery = useCallback(() => {
        setShowResults(false)

        if (isBackdropOpen) {

            setIsBackdropOpen(false)
        }
    }, [isBackdropOpen, setIsBackdropOpen, setShowResults])

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