import React from "react";
import QueryResults from '../../../pages/Query/QueryResults'
import Styles from './styles';

import useQuery from '../../../controllers/queryController'



export default function Query() {

    const {
        errors,
        textInput,
        handleClear,
        handleSubmit,
        queryLabel,
        showResults,
        getStats,
        results,
        openBackdrop,
        //setShowResults,

        getQueryOptions,
        queryOptions,
        handleAddNewQuery,
        handleDelQuery,
        handleQueryOnChange,
        handleQueryOptionOnChange,
        
        schoolPicLoc,
        programPicLoc,
        rotationPicLoc,
        studentPicLoc

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
                        <Styles.Grid item md={3} sm={12}>
                            <Styles.Card 
                                title="School Statistics"
                                model="school"
                                stats={getStats.school()}
                            >
                            <Styles.Image 
                                alt="School image."
                                src={schoolPicLoc}
                            />

                        </Styles.Card>
                    </Styles.Grid>
                    <Styles.Grid item md={3} sm={12}>
                        <Styles.Card 
                            title="Program Statistics"
                            model="program"
                            stats={getStats.program()}
                        >
                            <Styles.Image 
                                alt="Program image."
                                src={programPicLoc}
                            /> 

                        </Styles.Card>
                    </Styles.Grid>
                    <Styles.Grid item md={3} sm={12}>
                        <Styles.Card 
                            title="Rotation Statistics"
                            model="rotation"
                            stats={getStats.rotation()}
                        >
                            <Styles.Image 
                                alt="Rotation image."
                                src={rotationPicLoc}
                            /> 
                        </Styles.Card>
                    </Styles.Grid>
                    <Styles.Grid item md={3} sm={12}>
                        <Styles.Card 
                            title="Student Statistics"
                            model="student"
                            stats={getStats.student()}
                        >                        
                            <Styles.Image 
                                alt="Student image."
                                src={studentPicLoc}
                            />                       
                        </Styles.Card>
                    </Styles.Grid>
                </Styles.BottomGrid>
                <Styles.SimpleBackDrop 
                    openBackdrop={openBackdrop}
                />
            </>
            }
            {
                showResults &&  <QueryResults results={results} />
            }
        </Styles.Paper>
    )
}
