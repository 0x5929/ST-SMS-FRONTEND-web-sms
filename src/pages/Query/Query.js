import React from "react";
import QueryResults from "./QueryResults"
import Controls from '../../components/index';

import  useQuery  from '../../controllers/queryController'



export default function Query() {


    const {
        textInput,
        handleClear,
        handleSubmit,
        queryLabel,
        showResults,
        getStats,
        results,
        openBackdrop
        //setShowResults

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
                />
            }
            {
                showResults &&  <QueryResults results={results} />
            }
        </Controls.Paper>
    )
}
