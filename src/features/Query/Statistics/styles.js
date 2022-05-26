import { Grid as MuiGrid } from '@mui/material'
import { styled } from '@mui/material/styles';
import {
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    ResponsiveContainer
  } from "recharts";

import Components from '../../../components'


const ReChartsStyles = (theme) => {
    return {
        chartWidth: '100%',
        chartHeight: 300,
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

const GridContainer = styled(MuiGrid)(({ theme }) => ({
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}))


const Grid = styled(MuiGrid)(({ theme }) => ({
    // Styling for Grid if needed
    [theme.breakpoints.up('mobile')] : {
        margin: 'auto',

    },
}))


const Card = styled(Components.Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1e202a' : '#ffffff',
    margin: theme.spacing(1)

}))

const Typography = styled(Components.BaseTypography)(({ theme }) => ({
    fontFamily: 'Smooch',
    textAlign: 'center'

}))

const Styles = {
    ReChartsStyles,
    GridContainer,
    Grid,
    Card,
    Typography,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    ResponsiveContainer
}


export default Styles


