import React from 'react'

import { 
    Box as MuiBox, 
    Stack as MuiStack } from '@mui/material';

import { AddBox as AddBoxIcon } from '@mui/icons-material';

import { Select2 } from '../Inputs'

import {  BaseIconButton  } from '../Buttons'



import { createAddRotFormStyles } from './styles'

const Styles = createAddRotFormStyles({MuiStack, MuiBox, BaseIconButton})


function ProgramForm({ course, rotation }) {



    return (
        <>
            <Select2
                ref={inputRefs.course}
                name="course"
                label="Course"
                options={getCourseOptions()}
                defaultValue={getCourseOptions()[0].value}
                errorHandler={validations.course}
                showError={showError}     
                clearFields={clearFields}                   
            />
            <Styles.Stack direction="row" spacing={1}>
            <Select2
                ref={inputRefs.rotation}
                name="rotation"
                label="Rotation"
                options={getRotationOptions( useMemo(()=> inputRefs.course.current ? inputRefs.course.current.value : '', [inputRefs.course.current]) )}
                defaultValue={getRotationOptions()[0].rotation}
                errorHandler={validations.rotation}
                showError={showError}
                clearFields={clearFields}                        
            />
            <Styles.AddRotBtn size="medium" onClick={handleOpenAddRotModal}>
                <AddBoxIcon />
            </Styles.AddRotBtn>
        </Styles.Stack>
            <Styles.Modal
            modalTitle="Add Rotation"
            isModalOpen={isAddRotModalOpen}
            handleCloseModal={handleCloseAddRotModal}
        >
            <RotationForm 
                handleAddRotInputChange={handleAddRotInputChange}
                handleAddRotSubmit={handleAddRotSubmit}
                handleAddRotClear={handleAddRotClear}
                rotationFormValues={rotationFormValues}
                rotationFormErrors={rotationFormErrors}
                getCourseOptions={getCourseOptions}
            />
        </Styles.Modal>
    </>
  )
}

export default React.memo(ProgramForm)