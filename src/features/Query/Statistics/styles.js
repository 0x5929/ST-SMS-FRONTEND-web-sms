import { Grid as MuiGrid } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles';
import {
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    ResponsiveContainer
  } from "recharts";

import Components from '../../../components'

// https://animista.net/
const shadowDrop2Center = keyframes`
  0% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    -webkit-transform: translateZ(50px);
            transform: translateZ(50px);
    -webkit-box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
            box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.35);
  }
`;


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


const BaseCard = styled(Components.BaseCard)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1e202a' : '#ffffff',
    margin: theme.spacing(1),
}))


// with animation
const Card = styled(BaseCard)`

    &:hover {
        animation: ${shadowDrop2Center} 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    }

`;


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


