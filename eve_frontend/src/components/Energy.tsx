import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const InfoCard = ({ icon: Icon, title, content}) => {
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
            <Typography variant="body1" className='font-economica'>
              {content}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InfoCard;
