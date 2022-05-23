
import { useTheme } from '@mui/material/styles';


export default function useCharts(){

    const theme = useTheme();
    const labelAngle = 0
    const labelLoc = 'bottom'
    const isAnimationActive = false
    const lineDot = false

    return {
        theme,
        labelAngle,
        labelLoc,
        isAnimationActive,
        lineDot
    }
}
