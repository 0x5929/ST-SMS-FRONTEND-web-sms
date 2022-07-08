import React from "react"
import { Box as MuiBox, Paper as MuiPaper } from '@mui/material'; 

import createQueryStyles from './styles'
import { QueryResults } from '../Results'
import { Statistics  } from '../Statistics'
import { QueryForm } from '../../Forms'
import { useQueryForm } from '../../../hooks'
import Components from '../../../components'


const Styles = createQueryStyles({ MuiPaper, MuiBox })

function Query() {

    console.log('Query feature rendered')
    const [queryFormStates, queryFormHandlers] = useQueryForm()

    const { queryFormState } = queryFormStates;
    const { handleBacktoQuery } = queryFormHandlers;

    return (
        <Styles.Paper>
            {            
                !queryFormState.showResults &&

                <>
                    <QueryForm
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

export default React.memo(Query)