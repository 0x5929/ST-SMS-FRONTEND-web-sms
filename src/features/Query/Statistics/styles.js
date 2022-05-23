import { styled } from '@mui/material/styles';

import {
    LineChart as ReLineChart,
    Line as ReLine,
    XAxis as ReXAxis,
    YAxis as ReYAxis,
    Tooltip as ReTooltip,
    Label as ReLabel,
    ResponsiveContainer as ReResponsiveContainer
  } from "recharts";

const LineChart = styled(ReLineChart)(( {theme} ) => ({
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    width: theme.spacing(62.5),
    height: theme.spacing(37.5)
}));

const Line = styled(ReLine)(( {theme} ) => ({
    // styling Grid if needed
}));

const XAxis = styled(ReXAxis)(( {theme} ) => ({
    // styling Grid if needed
}));

const YAxis = styled(ReYAxis)(( {theme} ) => ({
    // styling Grid if needed
}));

const Tooltip = styled(ReTooltip)(( {theme} ) => ({
    // styling Grid if needed
}));

const Label = styled(ReLabel)(( {theme} ) => ({
    // styling Grid if needed
}));

const ResponsiveContainer = styled(ReResponsiveContainer)(( {theme} ) => ({
    // styling Grid if needed
}));


const ReChartsStyles = (theme) => {
    return {
        AxisStroke: theme.palette.text.secondary,
        AxisStyle: theme.typography.body2,

        LabelStyle: {
            textAnchor: 'middle',
            fill: theme.palette.text.primary,
            ...theme.typography.body1,
        },

        LineStoke: theme.palette.primary.main
    }
}

const Styles = {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Label,
    ResponsiveContainer,
    ReChartsStyles
}

export default Styles 