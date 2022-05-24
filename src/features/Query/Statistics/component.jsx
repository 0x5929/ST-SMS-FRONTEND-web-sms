import React from "react";

import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer
} from "recharts";

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

          <Styles.Grid container>
            {
              Object.keys(data).map((key, index)=>(
                <Styles.Grid item laptop={3} key={key}>
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

          </Styles.Grid>
    )
}



