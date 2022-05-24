import React from "react";

import { useCharts } from "../../../hooks";
import Styles from './styles';
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer
} from "recharts";
export default function Statistics({data}) {


  const {
    theme,
  } = useCharts()

  const {
    AxisStroke,
    AxisStyle,
  } = Styles.ReChartsStyles(theme)


    return (
          <ResponsiveContainer 
            width={350}
            height={350}>
            <BarChart
              data={data}
              margin={{
                top: 0,
                right: 0,
                bottom: 0,
                left: -35,
              }}
            >
              <XAxis 
                dataKey="year"
                stroke={AxisStroke}
                style={AxisStyle}
              />
              <YAxis          
                stroke={AxisStroke}
                style={AxisStyle}
              >
              </YAxis>
              <Tooltip />

              <Bar dataKey="count" fill={theme.palette.info.dark} />
            
            </BarChart>
            </ResponsiveContainer>
    )
}



