import React from "react"
import { Box as MuiBox, Paper as MuiPaper } from '@mui/material'; 

import createQueryStyles from './styles'

import { QueryResults } from '../Results'
import { Statistics  } from '../Statistics'
import Components from '../../../components'
import { useQueryForm } from '../../../hooks'


const Styles = createQueryStyles({ MuiPaper, MuiBox })

function Query() {

    const [queryFormStates, queryFormHandlers] = useQueryForm()

    const { queryFormState } = queryFormStates;
    const { handleBacktoQuery } = queryFormHandlers;

    return (
        <Styles.Paper>
            {            
                !queryFormState.showResults &&

                <>
                    <Components.QueryForm
                        queryFormStates={queryFormStates}
                        queryFormHandlers={queryFormHandlers}
                    />
                    <Styles.Box>
                        <Statistics />
                    </Styles.Box>
                    <Components.SimpleBackDrop 
                        openBackdrop={queryFormState.isBackdropOpen}
                    />
                </>
            }
            {
                queryFormState.showResults &&  
                <QueryResults 
                    queryResults={queryFormState.queryResults}
                    handleBacktoQuery={handleBacktoQuery}
                />
            }
        </Styles.Paper>
    )
}

export default Query