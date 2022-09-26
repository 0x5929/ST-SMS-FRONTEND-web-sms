import React from "react"
import { Grid as MuiGrid } from '@mui/material'
import {
	BarChart,
	XAxis,
	YAxis,
	Tooltip,
	Bar,
	ResponsiveContainer } from "recharts"

import {createStatisticsStyles} from "./styles"
import Components from '../../../components'
import { useCharts } from "../../../hooks"

const Styles = createStatisticsStyles({
	MuiGrid,
	BaseTypography: Components.BaseTypography,
	BaselineCard: Components.BaseCard
})

function Statistics() {
    console.log('Statistics feature rendered')

	const [ data, theme ] = useCharts()

	const {
		chartWidth,
		chartHeight,
		axisStroke,
		axisStyle,
		barFill,
		chartMargins
	} = Styles.ReChartsStyles(theme)

	return (

			<Styles.GridContainer data-testid="statistics-component" container>
				<Styles.Grid item mobile={12}>
					<Styles.Typography text="Statistics" variant="h2"/>
				</Styles.Grid>
				{
					Object.keys(data).map((key, index)=>(
						<Styles.Grid item laptop={6} key={key}>
							<Styles.Card
								title={`Student ${key}s`}
							>
								<ResponsiveContainer 
									width={chartWidth}
									height={chartHeight}
								>
										<BarChart 
											data={data[key]}
											margin={chartMargins}
										>
											<XAxis 
												dataKey="year"
												stroke={axisStroke}
												style={axisStyle}
											/>
											<YAxis          
												stroke={axisStroke}
												style={axisStyle}
											/>
											<Tooltip />
											<Bar dataKey="count" fill={barFill} />
										</BarChart>
								</ResponsiveContainer>
							</Styles.Card>
						</Styles.Grid>
					))
				}

			</Styles.GridContainer>
	)
}



export default React.memo(Statistics)