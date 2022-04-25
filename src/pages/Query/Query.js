import React from "react";
import QueryResults from "./QueryResults"
import Controls from '../../components/index';

import  useQuery  from '../../controllers/queryController'



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
        <Controls.Paper>
            {            
                !showResults &&

                <Controls.QueryLayoutGrid 
                    textInput={textInput}
                    handleClear={handleClear}
                    handleSubmit={handleSubmit}
                    queryLabel={queryLabel}
                    getStats={getStats}
                    openBackdrop={openBackdrop}
                    getQueryOptions={getQueryOptions}
                    queryOptions={queryOptions}
                    handleAddNewQuery={handleAddNewQuery}
                    handleDelQuery={handleDelQuery}
                    handleQueryOnChange={handleQueryOnChange}
                    handleQueryOptionOnChange={handleQueryOptionOnChange}
                    schoolPicLoc={schoolPicLoc}
                    programPicLoc={programPicLoc}
                    rotationPicLoc={rotationPicLoc}
                    studentPicLoc={studentPicLoc}
                    errors={errors}
                />
                
            }
            {
                showResults &&  <QueryResults results={results} />
            }
        </Controls.Paper>
    )
}
