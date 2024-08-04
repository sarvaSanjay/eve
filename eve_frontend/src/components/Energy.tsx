import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import GradientBarChart from '@/components/graph';

const InfoCard = ({ icon: Icon, title, overallRating, overallJustification, subsections}) => {
  return (
    <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#98BF64' }}>
      <Grid container spacing={3}>
        <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
          <Icon sx={{ fontSize: 150, color: '#fff' }} />
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
