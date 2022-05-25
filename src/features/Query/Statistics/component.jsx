import React from "react";
import Styles from "./styles";

import { useCharts } from "../../../hooks";


export default function Statistics() {

  const { 
    data, 
    theme  
  } = useCharts()


  const {
    chartWidth,
    chartHeight,
    axisStroke,
    axisStyle,
    barFill,
    chartMargins
  } = Styles.ReChartsStyles(theme)

    return (

          <Styles.GridContainer container>
                <Styles.Grid item mobile={12}>
                    <Styles.Typography text="Statistics" variant="h2"/>
                </Styles.Grid>
            {
              Object.keys(data).map((key, index)=>(
                <Styles.Grid item laptop={6} key={key}>
                <Styles.Card
                  title={`Student ${key}s`}
                >
                  <Styles.ResponsiveContainer 
                    width={chartWidth}
                    height={chartHeight}
                  >
                    <Styles.BarChart
                      data={data[key]}
                      margin={chartMargins}
                    >
                      <Styles.XAxis 
                        dataKey="year"
                        stroke={axisStroke}
                        style={axisStyle}
                      />
                      <Styles.YAxis          
                        stroke={axisStroke}
                        style={axisStyle}
                      />
                      <Styles.Tooltip />
                      <Styles.Bar dataKey="count" fill={barFill} />
                    </Styles.BarChart>
                  </Styles.ResponsiveContainer>
                </Styles.Card>
              </Styles.Grid>
              ))
            }

          </Styles.GridContainer>
    )
}



