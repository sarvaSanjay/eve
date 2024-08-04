import React, { useEffect, useState } from 'react';
import { Paper, Grid, Box, Typography } from '@mui/material';
import PieChart from './PieChart';
const InfoCard = ({ icon: Icon, title, overallRating, overallJustification, sub_1, sub_1_rating, sub_1_just, sub_2, sub_2_rating, sub_2_just, percentages,labels}) => {
  
  const colors = [
    'rgb(255, 99, 132)',   // Red
    'rgb(54, 162, 235)',   // Blue
    'rgb(255, 205, 86)',   // Yellow
    'rgb(75, 192, 192)',   // Teal
    'rgb(153, 102, 255)',  // Purple
    'rgb(255, 159, 64)',   // Orange
    'rgb(255, 99, 71)',    // Tomato
    'rgb(34, 193, 195)',   // Aqua Blue
    'rgb(253, 187, 45)',   // Gold
    'rgb(46, 204, 113)',   // Emerald
    'rgb(231, 76, 60)',    // Red
    'rgb(52, 152, 219)',   // Sky Blue
    'rgb(155, 89, 182)',   // Amethyst
    'rgb(241, 196, 15)',   // Sunflower
    'rgb(39, 174, 96)',    // Green
    'rgb(142, 68, 173)',   // Wisteria
    'rgb(44, 62, 80)',     // Midnight Blue
    'rgb(243, 156, 18)',   // Orange
    'rgb(211, 84, 0)',     // Pumpkin
    'rgb(192, 57, 43)',    // Pomegranate
    'rgb(149, 165, 166)',  // Concrete
    'rgb(22, 160, 133)',   // Turquoise
    'rgb(44, 62, 80)',     // Dark Blue
    'rgb(243, 243, 243)',  // Light Grey
    'rgb(0, 255, 255)',    // Cyan
    'rgb(255, 105, 180)',  // Hot Pink
    'rgb(64, 224, 208)',   // Turquoise
    'rgb(255, 140, 0)',    // Dark Orange
    'rgb(100, 149, 237)',  // Cornflower Blue
    'rgb(255, 20, 147)',   // Deep Pink
    'rgb(186, 85, 96)',    // Indian Red
    'rgb(210, 180, 140)',  // Tan
    'rgb(139, 69, 19)',    // Saddle Brown
    'rgb(255, 0, 0)'       // Red
  ];
  

  const [data, setData] = useState({
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  });

  useEffect(()=>{
    setData(
      {
        labels:labels,
        datasets: [
          {
            label: title,
            data: percentages,
            backgroundColor: colors.slice(0,percentages.length),
            hoverOffset: 4,
          },
        ],
      }
     )
  },[labels, percentages,title,colors])
    
  console.log(percentages)

  return (
    <Paper elevation={3} sx={{ padding: '20px' }} className={title === "INDOOR AIR QUALITY" || title === "LOCATION ANALYSIS"?'bg-gradient-to-r from-white via-gray-100 to-white':
    'bg-gradient-to-r from-green-400 via-green-100 to-green-400'}>
      <Grid container spacing={3}>
        {/* Icon Column */}
        <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
          <Icon sx={{ fontSize: 150, color: (title === "INDOOR AIR QUALITY" || title === "LOCATION ANALYSIS") ? '#4F7942' : '#fff', }} />
        </Grid>

        {/* Text Column */}
        <Grid item xs={4}>
          <Box sx={{ maxWidth: '400px' }}>
            <Typography variant="h5" component="h2" className='font-economica' gutterBottom>
              {title}
            </Typography>

            <div key={title}>
              <Typography variant="h6" className='font-economica'>
                <strong>{sub_1}</strong>
              </Typography>
              <Typography variant="body1" className='font-economica'>
                <strong>{sub_1} Rating:</strong> {sub_1_rating}
              </Typography>
              <Typography variant="body1" className='font-economica'>
                <strong>{sub_1} Justification:</strong> {sub_1_just}
              </Typography>
              <Typography variant="h6" className='font-economica'>
                <strong>{sub_2}</strong>
              </Typography>
              <Typography variant="body1" className='font-economica'>
                <strong>{sub_2} Rating:</strong> {sub_2_rating}
              </Typography>
              <Typography variant="body1" className='font-economica'>
                <strong>{sub_2} Justification:</strong> {sub_2_just}
              </Typography>
            </div>

            <Typography variant="body1" className='font-economica'>
              <strong>Overall Rating:</strong> {overallRating}
            </Typography>
            <Typography variant="body1" className='font-economica'>
              <strong>Overall Justification:</strong> {overallJustification}
            </Typography>
          </Box>
        </Grid>

        {/* Graph Column */}
        <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
          <PieChart data={data} />
        </Grid>
      </Grid>
    </Paper>
);
};

export default InfoCard;

