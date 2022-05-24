import React from "react";
import { QueryResults } from '../Results'
import Styles from './styles';

import { useQuery } from '../../../hooks'



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

        enrollment,
        employment,
        graduates,
        exam
    } = useQuery()

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
                    <Styles.BottomGrid container>
                        <Styles.Grid item laptop={3}>
                            <Styles.Card
                                title="Student Enrollment"
                            >
                                <Styles.Statistics data={enrollment} />
                        </Styles.Card>
                    </Styles.Grid>
                    <Styles.Grid item laptop={3}>
                        <Styles.Card
                            title="Student Graduates"
                        >
                            <Styles.Statistics data={graduates} />
                        </Styles.Card>
                    </Styles.Grid>
                    <Styles.Grid item laptop={3}>
                        <Styles.Card
                            title="Student Exam"
                        >
                            <Styles.Statistics data={exam} />
                        </Styles.Card>
                    </Styles.Grid>
                    <Styles.Grid item laptop={3}>
                        <Styles.Card 
                            title="Student Employment"
                        >                        
                            <Styles.Statistics  data={employment} />                      
                        </Styles.Card>
                    </Styles.Grid>
                </Styles.BottomGrid>
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
