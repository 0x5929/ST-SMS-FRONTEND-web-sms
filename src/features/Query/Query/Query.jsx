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

    const handleBackdrop = useCallback(async (callback, authedAxios, queryOptions) =>{
        setIsBackdropOpen(true)

        try{
            const response = await callback(authedAxios, queryOptions)
            setIsBackdropOpen(false)
            setShowResults(true)
            
            return response

        }
        catch(err) {
            console.error(err)
        }


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