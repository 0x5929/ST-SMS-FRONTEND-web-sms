import React, { useState, useCallback } from "react"
import { Box as MuiBox, Paper as MuiPaper } from '@mui/material'; 

import createQueryStyles from './styles'
import SearchStudents from "./SearchStudents";
import { QueryResults } from '../Results'
import { Statistics  } from '../Statistics'
import Components from '../../../components'


const Styles = createQueryStyles({ MuiPaper, MuiBox })

function Query() {

    console.log('Query feature rendered')
    const [ queryResults, setQueryResults ] = useState([])
    const [ showResults, setShowResults ] = useState(false)
    const [ isBackdropOpen, setIsBackdropOpen ] = useState(false)

    const handleBackdrop = useCallback(() =>{
        //queryFormDispatch({type: 'set-isBackdropOpen', payload: true})
        setIsBackdropOpen(true)
        // if isBackdropOpen === false
            //handleToggle()

        setTimeout(()=> {
            //queryFormDispatch({type: 'set-isBackdropOpen', payload: false})
            setIsBackdropOpen(false)
            // if isBackdropOpen === true
                //handleToggle()
            //queryFormDispatch({type: 'set-showResults', payload: true})
            setShowResults(true)
            // if showResults === false
                //handleToggle()
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