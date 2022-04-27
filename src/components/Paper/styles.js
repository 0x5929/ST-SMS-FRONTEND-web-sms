
import { Paper as MuiPaper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Paper = styled(MuiPaper)(( {theme} ) => ({
    'margin' : theme.spacing(5),
    'padding': theme.spacing(3)
  }));
  

const Styles = {
    Paper
}

export default Styles