import React from 'react';
import Styles from './styles'


export function QueryForm(props) {

    const {
        textInput,
        handleClear,
        queryLabel,
        handleSubmit,
        getQueryOptions,
        queryOptions,
        handleAddNewQuery,
        handleDelQuery,
        handleQueryOnChange,
        handleQueryOptionOnChange,
        errors,
    } = props;

    return (
            <Styles.QueryForm onSubmit={(e)=>(handleSubmit(e, queryOptions))}>
                <Styles.Grid container rowSpacing={0} columnSpacing={0}>
                    {
                        queryOptions.map((query, index) => (
                            <Styles.Grid container item sm={12} key={index} spacing={0}>
                                <Styles.Grid item md={9} sm={12}>
                                    <Styles.QuerySearchBar 
                                        index={index}
                                        label={queryLabel}
                                        name={queryOptions[index]['query']}
                                        value={queryOptions[index]['value']}
                                        onChange={(e) => (handleQueryOnChange(e, index))}
                                        error={errors['value' + index.toString()]}
                                        textInput={textInput}
                                        handleClear={handleClear}
                                    />

                                </Styles.Grid>
                                <Styles.Grid item md={2} sm={12}>                     
                                    <Styles.QuerySelect
                                        label="Query By"
                                        name="options"
                                        value={queryOptions[index]['query']}
                                        onChange={(e)=>(handleQueryOptionOnChange(e, index))}
                                        error={errors['query' + index.toString()]}
                                        options={getQueryOptions()}
                                        sx={{ fontSize: 15}}
                                        variant={'standard'}
                                        autoWidth
                                    />
                                </Styles.Grid>
                                    {
                                        queryOptions.length !== 1 && (

                                            <Styles.Grid item md={1} sm={12}>                                
                                                <Styles.DelButton 
                                                    text="Delete"
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={ ()=> (handleDelQuery(index))}
                                                />             
                                            </Styles.Grid>
                                        )
                                    }              
                                    {
                                        queryOptions.length - 1 === index && (
                                            
                                            <Styles.Grid item sm={12}>

                                                <Styles.AddButton
                                                    text="ADD NEW QUERY PARAMETER"
                                                    color="primary"
                                                    variant="outlined"
                                                    onClick={() => (handleAddNewQuery(index))}
                                                />
                                            </Styles.Grid> 
                                        )

                                    }

                            </Styles.Grid>
                        ))

                    }
                    <Styles.Grid item xs={12}>
                        <Styles.QueryButton 
                            type="Submit"
                            color="secondary"
                            variant="contained"
                        >
                            QUERY
                            <Styles.DoubleArrowIcon 
                                fontSize="large"
                            />
                        </Styles.QueryButton>    
                    </Styles.Grid>     
                </Styles.Grid>
            </Styles.QueryForm>
    )
}