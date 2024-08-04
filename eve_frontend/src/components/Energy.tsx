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
const InfoCard = ({ icon: Icon, title, overallRating, overallJustification, subsections, bgcolor = '#98BF64', 
  iconcolor = '#fff' }) => {
  return (
    <Paper elevation={3} sx={{ padding: '20px', backgroundColor: bgcolor }}>
      <Grid container spacing={3}>
        <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
          <Icon sx={{ fontSize: 150, color: iconcolor }} />
        </Grid>
        <Grid item xs={8}>
        <Box>
          <Typography variant="h5" component="h2" className='font-economica' gutterBottom>
            {title}
          </Typography>
          {Object.keys(subsections).map(subsection => (
            <div key={subsection}>
              <Typography variant="body1" className='font-economica'>
                <strong>{subsection} Rating:</strong> {subsections[subsection].rating}
              </Typography>
              <Typography variant="body1" className='font-economica'>
                <strong>{subsection} Justification:</strong> {subsections[subsection].justification}
              </Typography>
            </div>
          ))}
          <Typography variant="body1" className='font-economica'>
            <strong>Overall Rating:</strong> {overallRating}
          </Typography>
          <Typography variant="body1" className='font-economica'>
            <strong>Overall Justification:</strong> {overallJustification}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Paper>
);
};

export default InfoCard;

