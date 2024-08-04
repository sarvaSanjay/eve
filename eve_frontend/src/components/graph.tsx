import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const GradientBarChart = ({ averageRating, userRating }) => {
  const data = [
    { name: 'Average', value: averageRating },
    { name: 'Your Rating', value: userRating }
  ];

  return (
    <BarChart width={300} height={150} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ff7e5f', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#feb47b', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <Bar dataKey="value" fill="url(#gradient)" />
    </BarChart>
  );
};

export default GradientBarChart;
