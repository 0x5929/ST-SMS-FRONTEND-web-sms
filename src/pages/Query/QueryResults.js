import React from 'react'
import useTable from '../../controllers/query/queryResultController.js'



  

export default function QueryResults() {


    
    const {
        records,
        //setRecords,
        tableData,
        Controls

    } = useTable()


      
    
    return (
        <Controls.TblContainer>
            <Controls.TblHead tableData={tableData} />
            <Controls.TblBody records={records} />
        </Controls.TblContainer>
    )
}
