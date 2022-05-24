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
    
    ReChartsStyles
}

export default Styles 