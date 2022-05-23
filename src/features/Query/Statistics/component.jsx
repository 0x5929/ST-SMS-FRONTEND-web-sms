import React from "react";
import Styles from './styles';

import { useTheme } from '@mui/material/styles';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer
} from "recharts";


export default function Statistics({title, data}) {


  const theme = useTheme();

    
    return (
        <ResponsiveContainer>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis 
                dataKey="year"
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              >
                 <Label
                    angle={0}
                    position="bottom"
                    style={{
                        textAnchor: 'middle',
                        fill: theme.palette.text.primary,
                        ...theme.typography.body1,
                    }}
                >
                    {title}
            </Label>
              </XAxis>
              <YAxis          
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              />
              <Tooltip />
              <Line
                isAnimationActive={false}
                type="monotone"
                dataKey="count"
                stroke={theme.palette.primary.main}
                dot={false}
              />
            </LineChart>
       </ResponsiveContainer>
    )
}



