import React from 'react'

import { 
    Table as MuiTable, 
    TableCell,
    TableHead,
    TableRow, 
    TableBody } from '@mui/material'

import { createDetailedTableStyles } from './styles'


const Styles = createDetailedTableStyles({MuiTable})


const DetailedTblContainer = React.memo((props) => {
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


const DetailedTblBody = React.memo(({ tableData, ...others  }) => {

    const emptyStudent = {

        pk: 0,
        studentId : '',
        firstName : '',
        lastName  : '',
        phoneNumber: '',
        email: '',
        mailingAddress : '',
        course: '',
        rotation: '1',
        startDate: new Date(),
        completionDate: new Date(),
        dateEnrollmentAgreementSigned: new Date(),
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

    const convertNullToEmpty = () => emptyStudent

    // checks for condition null or undefined
    let record = others.record
    if (record == null) {
        record = convertNullToEmpty()
    }


    return (
        <TableBody data-testid="detailed-table-body" {...others}>
            {
                tableData.detailedViewColumnCells.map( col => (
                    <TableRow key={ col.id }>
                        <TableCell data-testid="detail-view-tbl-category-col">{ col.label }</TableCell>
                        <TableCell 
                            data-testid="detailview-tbl-data-col">
                                { String(record[col.id]) }
                        </TableCell> 
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