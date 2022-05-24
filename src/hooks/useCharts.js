import { useTheme } from '@mui/material/styles';

export default function useCharts(){

    const theme = useTheme();
    const labelAngle = 270
    const labelLoc = 'left'


    return {
        theme,
        labelAngle,
        labelLoc,
    }
}
