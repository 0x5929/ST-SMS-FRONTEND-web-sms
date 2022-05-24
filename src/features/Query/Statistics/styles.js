import { Grid as MuiGrid } from '@mui/material'
import { styled } from '@mui/material/styles';

import Components from '../../../components'


const ReChartsStyles = (theme) => {
    return {
        chartWidth: '100%',
        chartHeight: 350,
        axisStroke: theme.palette.text.secondary,
        axisStyle: theme.typography.body2,
        barFill: theme.palette.info.dark,
        chartMargins: {
            top: 0,
            right: 0,
            bottom: 0,
            left: -35,
        }
    }
}

const Grid = styled(MuiGrid)(({ theme }) => ({
    // styling for Grid if needed
}))


const Card = styled(Components.Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1e202a' : '#ffffff',

}))


const Styles = {
    ReChartsStyles,
    Grid,
    Card
}


export default Styles


