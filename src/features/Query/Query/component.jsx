import React from "react";
import { QueryResults } from '../Results'
import Styles from './styles';

import { useQueryForm } from '../../../hooks'


export default function Query() {

    const {
        errors,
        textInput,
        handleClear,
        handleSubmit,
        queryLabel,
        showResults,
        results,
        openBackdrop,

        getQueryOptions,
        queryOptions,
        handleAddNewQuery,
        handleDelQuery,
        handleQueryOnChange,
        handleQueryOptionOnChange,
        handleBacktoQuery,

    } = useQueryForm()

    return (
        <Styles.Paper>
            {            
                !showResults &&

                <>
                    <Styles.QueryForm 
                        textInput={textInput}
                        handleClear={handleClear}
                        handleSubmit={handleSubmit}
                        queryLabel={queryLabel}
                        getQueryOptions={getQueryOptions}
                        queryOptions={queryOptions}
                        handleAddNewQuery={handleAddNewQuery}
                        handleDelQuery={handleDelQuery}
                        handleQueryOnChange={handleQueryOnChange}
                        handleQueryOptionOnChange={handleQueryOptionOnChange}
                        errors={errors}
                    />
                    <Styles.Box>
                        <Styles.Statistics />
                    </Styles.Box>
                    <Styles.SimpleBackDrop 
                        openBackdrop={openBackdrop}
                    />
                </>
            }
            {
                showResults &&  
                <QueryResults 
                    results={results}
                    handleBacktoQuery={handleBacktoQuery}
                />
            }
        </Styles.Paper>
    )
}
