import React from 'react';
import { Grid } from '@mui/material';
import { DoubleArrow as DoubleArrowIcon } from '@mui/icons-material';

import { createQueryFormStyles } from './styles'
import { SearchBar } from '../../components/Searchbar';
import { Select as BaseSelect } from '../../components/Inputs'
import {
    BaseButton ,
    BaseIconButton,
} from '../../components/Buttons'


const Styles = createQueryFormStyles({SearchBar, BaseSelect, BaseButton, BaseIconButton})

function QueryForm({queryFormStates, queryFormHandlers, ...others}) {
    
    const {
        
        queryOptions,
        queryFormErrors,
        textInput

    } = queryFormStates

    const {

        getQueryOptions,
        handleSubmit,
        handleQueryOnChange,
        handleClear,
        handleQueryOptionOnChange,
        handleDelQuery,
        handleAddNewQuery,
        
    } = queryFormHandlers

    
    return (
            <Styles.QueryForm onSubmit={(e)=>(handleSubmit(e, queryOptions))} {...others}>
                <Grid container rowSpacing={0} columnSpacing={0}>
                    {
                        queryOptions.map((query, index) => (
                            <Grid container item key={query.pk} spacing={0}>
                                <Grid item laptop={9} tablet={12} mobile={12}>
                                    <Styles.QuerySearchBar 
                                        label="Search Student Database"
                                        index={index}
                                        pk={query.pk}
                                        name={queryOptions[index]['query']}
                                        value={queryOptions[index]['value']}
                                        onChange={(e) => (handleQueryOnChange(e, index))}
                                        error={queryFormErrors['value' + query.pk.toString()]}
                                        textInput={textInput}
                                        handleClear={handleClear}
                                    />

                                </Grid>
                                <Grid item laptop={2} tablet={9} mobile={8}>                     
                                    <Styles.QuerySelect
                                        label="Query By"
                                        name="options"
                                        value={queryOptions[index]['query']}
                                        onChange={(e)=>(handleQueryOptionOnChange(e, index))}
                                        error={(queryFormErrors['query' + query.pk.toString()] ? true : false)}
                                        options={getQueryOptions()}
                                        variant={'standard'}
                                        autoWidth

                                        data-testid="queryby-select"
                                    />
                                </Grid>
                                    {
                                        queryOptions.length !== 1 && (

                                            <Grid item laptop={1} tablet={3} mobile={4}>                                
                                                <Styles.DelButton 
                                                    text="Delete"
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={ ()=> (handleDelQuery(index, query.pk)) }

                                                    data-testid="delete-query-btn"
                                                />             
                                            </Grid>
                                        )
                                    }              
                                    {
                                        queryOptions.length - 1 === index && (
                                            
                                            <Grid item mobile={12}>

                                                <Styles.AddButton
                                                    text="ADD NEW"
                                                    color="primary"
                                                    variant="outlined"
                                                    onClick={ () => (handleAddNewQuery(index)) }
                                                />                        
                                                <Styles.QueryButton 
                                                    type="Submit"
                                                    color="secondary"

                                                    data-testid="query-submit-btn"
                                                >
                                                    <DoubleArrowIcon 
                                                        fontSize="large"
                                                    />
                                                </Styles.QueryButton>    
                                            </Grid> 
                                        )
                                    }
                            </Grid>
                        ))

                    }
                    
                </Grid>
            </Styles.QueryForm>
    )
}

export default React.memo(QueryForm)