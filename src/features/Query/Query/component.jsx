import React from "react";
import { QueryResults } from '../Results'
import Styles from './styles';

import { useQueryForm } from '../../../hooks'


export default function Query() {

    const [queryFormStates, queryFormHandlers] = useQueryForm()

    const { queryFormState } = queryFormStates;
    const { handleBacktoQuery } = queryFormHandlers;

    return (
        <Styles.Paper>
            {            
                !queryFormState.showResults &&

                <>
                    <Styles.QueryForm
                        queryFormStates={queryFormStates}
                        queryFormHandlers={queryFormHandlers}
                    />
                    <Styles.Box>
                        <Styles.Statistics />
                    </Styles.Box>
                    <Styles.SimpleBackDrop 
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
