import React from 'react';
import { Paper, Grid, Box, Typography } from '@mui/material';
import PieChart from './PieChart';

const data = {
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
};

const InfoCard = ({ 
  icon: Icon, 
  title, 
  content, 
  userRating, 
  averageRating, 
  bgcolor = '#98BF64', 
  iconcolor = '#fff' 
}) => {
  return (
    <Paper elevation={3} sx={{ padding: '20px', backgroundColor: bgcolor }}>
       <Grid container spacing={3} alignItems="center">
      <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
        <Icon sx={{ fontSize: 300, color: iconcolor }} />
      </Grid>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h4" component="h2" className='font-economica' gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" className='font-economica'>
            {content}
          </Typography>
          {/* <GradientBarChart averageRating={averageRating} userRating={userRating} /> */}
        </Box>
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="center" alignItems="center" marginTop={'5rem'}>
        <PieChart data={data} />
      </Grid>
    </Grid>
    </Paper>
  );
};

export default InfoCard;

