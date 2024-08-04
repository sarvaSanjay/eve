import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import { LinearGradient, Stop, Defs } from 'recharts';



const data = [
  { subject: 'Energy Efficiency', A: 120, B: 70 },
  { subject: 'Indoor Air Quality', A: 98, B: 50 },
  { subject: 'Resource & Waste Management', A: 86, B: 65 },
  { subject: 'Location Analysis', A: 99, B: 40 },
];

const RadarChartComponent = () => {
  console.log(data)
  return (
    <RadarChart outerRadius={90} width={730} height={250} data={data}>
      <Defs>
        <LinearGradient id="colorA" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="5%" stopColor="#283240" stopOpacity={0} />
          <Stop offset="95%" stopColor="#283240" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient id="colorB" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="5%" stopColor="#324630" stopOpacity={0} />
          <Stop offset="95%" stopColor="#324630" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 150]} />
      <Radar name="Your Room's Score" dataKey="A" stroke="#3e4a5f" fill="url(#colorA)" fillOpacity={0.6} />
      <Radar name="Average Room in Ontario's Score" dataKey="B" stroke="#4a6a40" fill="url(#colorB)" fillOpacity={0.6} />
      <Tooltip />
    </RadarChart>
  );
};

export default RadarChartComponent;
