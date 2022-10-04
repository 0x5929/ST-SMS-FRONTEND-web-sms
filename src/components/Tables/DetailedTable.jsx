import React from 'react'

import { 
    Table as MuiTable, 
    TableCell,
    TableHead,
    TableRow, 
    TableBody } from '@mui/material'

import { createDetailedTableStyles } from './styles'


const Styles = createDetailedTableStyles({MuiTable})

const emptyStudentValues = {
    studentId : '',
    firstName : '',
    lastName  : '',
    phoneNumber: '',
    email: '',
    mailingAddress : '',
    course: '',
    rotation: '1',
    startDate: '',
    completionDate: '',
    dateEnrollmentAgreementSigned: '',
    thirdPartyPayerInfo: '',
    courseCost: '',
    chargesCharged : '',
    chargesPaid: '',
    paid: false,
    graduated: false,
    passedFirstExam: false,
    passedSecondOrThird: false,
    employed: false,
    position: '',
    placeOfEmployment: '',
    employmentAddress: '',
    startingWage: '',
    hoursWorked: '',
    descriptionAttempts: ''

}

const convertNullToEmpty = () => emptyStudentValues

const DetailedTblContainer = React.memo((props) => {
    console.log('DetailedTblContainer component rendered')
    const { children, ...others } = props

    return (
        <Styles.Table
            data-testid="detailed-table"

            { ...others }
        >
            { children }
        </Styles.Table>
    )
})


const DetailedTblHead = React.memo(({ tableData, ...others}) => {

    console.log('DetailedTblHead component rendered')
    return (
        <TableHead {...others}>
            <TableRow data-testid="detailed-table-header">
                { 
                    tableData.detailedViewHeadCells.map( headCell => (

                        <TableCell data-testid="detailed-table-header-cell" key={ headCell.id }>
                            { headCell.label }
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    )
})


const DetailedTblBody = React.memo((props) => {
    console.log('DetailedTblBody component rendered')
    const { 
        record, 
        tableData,

        ...others
     } = props

    //  console.log('record type: ', typeof record)
    //  console.log('record: ', record)
    // //  console.log('record: ', record['placeOfEmployment'])
    // //  console.log('record[firstName]: ', record['firstName'])

     console.log('tableData.detailedViewColumnCells: ', tableData.detailedViewColumnCells)
     console.log(record)

     tableData.detailedViewColumnCells.map( col => {
        console.log('col.id: ', col.id)
        console.log('col.label: ', col.label)
        try {
            console.log('record[col.id]: ', record[col.id])
        }
        catch {
            console.log('record one failed')
            console.log('record one failed, typeof record: ', typeof record)
            console.log('record one failed, col.id: ', col.id)
            console.log('record one failed, record: ', record)
        }

     })


    return (
        <TableBody data-testid="detailed-table-body" {...others}>
            {
                tableData.detailedViewColumnCells.map( col => (
                    <TableRow key={ col.id }>
                        <TableCell>{ col.label }</TableCell>
                        
                        <TableCell>{ record ? record[col.id] : 'N/A'}</TableCell> 
   
                    
                    </TableRow>
                ))
            }
        </TableBody>
    )
})

export {
    DetailedTblContainer,
    DetailedTblHead,
    DetailedTblBody
}