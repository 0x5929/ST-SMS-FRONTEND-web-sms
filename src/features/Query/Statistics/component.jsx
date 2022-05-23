import React from "react";

import useCharts from "../../../hooks";
import Styles from './styles';

export default function Statistics({title, data}) {


  const {
    theme,
    labelAngle,
    labelLoc,
    isAnimationActive,
    lineDot
  } = useCharts()

  const {
    AxisStroke,
    AxisStyle,
    LabelStyle,
    LineStroke
  } = Styles.ReChartsStyles(theme)

    
    return (
        <Styles.ResponsiveContainer>
            <Styles.LineChart
              // width={500}
              // height={300}
              data={data}
            >
              <Styles.XAxis 
                dataKey="year"
                stroke={AxisStroke}
                style={AxisStyle}
              >
                 <Styles.Label
                    angle={labelAngle}
                    position={labelLoc}
                    style={LabelStyle}
                >
                    {title}
            </Styles.Label>
              </Styles.XAxis>
              <Styles.YAxis          
                stroke={AxisStroke}
                style={AxisStyle}
              />
              <Styles.Tooltip />
              <Styles.Line
                isAnimationActive={isAnimationActive}
                type="monotone"
                dataKey="count"
                stroke={LineStroke}
                dot={lineDot}
              />
            </Styles.LineChart>
       </Styles.ResponsiveContainer>
    )
}



