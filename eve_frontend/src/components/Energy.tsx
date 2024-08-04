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
const InfoCard = ({ icon: Icon, title, overallRating, overallJustification, sub_1, sub_1_rating, sub_1_just, sub_2, sub_2_rating, sub_2_just}) => {
  return (
    <Paper elevation={3} sx={{ padding: '20px' }} className={title === "INDOOR AIR QUALITY"?'#bg-gradient-to-r from-grey-900 via-grey-100 to-grey-900':
    'bg-gradient-to-r from-green-400 via-green-100 to-green-400'}>
      <Grid container spacing={3}>
        {/* Icon Column */}
        <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
          <Icon sx={{ fontSize: 150, color: '#fff' }} />
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

