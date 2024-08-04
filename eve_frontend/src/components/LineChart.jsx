"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Defs, LinearGradient, Stop, Area } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const GradientLineChart = () => {
  return (
    <LineChart width={600} height={300} data={data}>
      <Defs>
        <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
          <Stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
        </LinearGradient>
      </Defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area 
        type="monotone" 
        dataKey="value" 
        stroke="none" 
        fill="url(#areaGradient)" 
      />
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke="#8884d8" 
        strokeWidth={2}
        dot={false} 
        activeDot={{ r: 8 }}
        fill="none" 
      />
    </LineChart>
  );
};

export default GradientLineChart;
