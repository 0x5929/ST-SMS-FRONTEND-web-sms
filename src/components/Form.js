import { styled } from '@mui/material/styles';

// FORM ELEMENT
const InputForm = styled('form')(( {theme} ) => ({

    '& .MuiFormControl-root':{    
        width: '80%',
        margin: theme.spacing(1)
    }
}));



export default function Form (props) {

    const { children, ...others } = props;

    return (
        <InputForm autoComplete="off"
            {...others}
        >
            {props.children}
        </InputForm>
    )

}