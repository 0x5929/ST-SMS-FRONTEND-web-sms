import React from "react";
import { QueryResults } from '../Results'
import Styles from './styles';

import { useQueryForm } from '../../../hooks'


export default function Query() {

    const {
        queryFormState,
        textInput,
        queryLabel,
        getQueryOptions,
        handleClear,
        handleSubmit,
        handleAddNewQuery,
        handleDelQuery,
        handleQueryOnChange,
        handleQueryOptionOnChange,
        handleBacktoQuery,

    } = useQueryForm()

    return (
        <Styles.Paper>
            {            
                !queryFormState.showResults &&

                <>
                    <Styles.QueryForm 
                        textInput={textInput}
                        handleClear={handleClear}
                        handleSubmit={handleSubmit}
                        queryLabel={queryLabel}
                        getQueryOptions={getQueryOptions}
                        queryOptions={queryFormState.queryOptions}
                        handleAddNewQuery={handleAddNewQuery}
                        handleDelQuery={handleDelQuery}
                        handleQueryOnChange={handleQueryOnChange}
                        handleQueryOptionOnChange={handleQueryOptionOnChange}
                        errors={queryFormState.queryFormErrors}
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
                    results={queryFormState.queryResults}
                    handleBacktoQuery={handleBacktoQuery}
                />
            }
        </Styles.Paper>
    )
}
