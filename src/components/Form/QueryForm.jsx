import React from 'react';
import Styles from './styles'


export function QueryForm({queryFormStates, queryFormHandlers}) {

    const {
        queryFormState,
        textInput
    } = queryFormStates;

    const {
        queryOptions,
        queryFormErrors,
    } = queryFormState

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
            <Styles.QueryForm onSubmit={(e)=>(handleSubmit(e, queryOptions))}>
                <Styles.Grid container rowSpacing={0} columnSpacing={0}>
                    {
                        queryOptions.map((query, index) => (
                            <Styles.Grid container item key={query.pk} spacing={0}>
                                <Styles.Grid item laptop={9} tablet={12} mobile={12}>
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

                                </Styles.Grid>
                                <Styles.Grid item laptop={2} tablet={9} mobile={8}>                     
                                    <Styles.QuerySelect
                                        label="Query By"
                                        name="options"
                                        value={queryOptions[index]['query']}
                                        onChange={(e)=>(handleQueryOptionOnChange(e, index))}
                                        error={queryFormErrors['query' + query.pk.toString()]}
                                        options={getQueryOptions()}
                                        variant={'standard'}
                                        autoWidth
                                    />
                                </Styles.Grid>
                                    {
                                        queryOptions.length !== 1 && (

                                            <Styles.Grid item laptop={1} tablet={3} mobile={4}>                                
                                                <Styles.DelButton 
                                                    text="Delete"
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={ ()=> (handleDelQuery(index, query.pk)) }
                                                />             
                                            </Styles.Grid>
                                        )
                                    }              
                                    {
                                        queryOptions.length - 1 === index && (
                                            
                                            <Styles.Grid item mobile={12}>

                                                <Styles.AddButton
                                                    text="ADD NEW"
                                                    color="primary"
                                                    variant="outlined"
                                                    onClick={ () => (handleAddNewQuery(index)) }
                                                />                        
                                                <Styles.QueryButton 
                                                type="Submit"
                                                color="secondary"
                                            >
                                                <Styles.DoubleArrowIcon 
                                                    fontSize="large"
                                                />
                                            </Styles.QueryButton>    
                                            </Styles.Grid> 
                                        )
                                    }
                            </Styles.Grid>
                        ))

                    }
                    
                </Styles.Grid>
            </Styles.QueryForm>
    )
}