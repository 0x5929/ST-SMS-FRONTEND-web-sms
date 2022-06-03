import { useTheme } from '@mui/material/styles'
import { getStats } from '../services/SMSStatisticsService'

export default function useCharts(){

    const data = getStats()
    const theme = useTheme()
    return [
        data,
        theme
    ]
}
