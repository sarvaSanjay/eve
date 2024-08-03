import React from 'react';
import { Box, Typography, Grid, Paper, Icon } from '@mui/material';
import {
  Bolt as EnergyIcon,
  Home as AirQualityIcon,
  Recycling as WasteIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

import Image from 'next/image';
import Gold from '../../public/Gold.png';


const EcoReport = () => {
  return (
    <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#98BF64' }}>
<Box textAlign="center">
  {/* <Icon sx={{ fontSize: 50 }}>eco</Icon> */}
  <Typography variant="h4" component="h1" gutterBottom>
        Your Environmental Sustainability and Efficiency Report
      </Typography>
      <Typography variant="h5" component="p" color="textSecondary">
        You're an
      </Typography>
      <div style={{ paddingLeft: '35rem', paddingBottom: '10px', paddingTop: '10px' }}>
        <Image
          src={Gold}
          alt="My Image"
          width={100}
          height={200}
        />
      </div>
      <Typography variant="h6" component="span" color="primary" mt={2}>
        Eco-Champion
      </Typography>
</Box>


      <Grid container spacing={3} mt={4}>
        <Grid item xs={6} textAlign="center">
          <EnergyIcon sx={{ fontSize: 50, color: '#4caf50' }} />
          <Typography variant="h6" component="h2" gutterBottom>
            Energy Efficiency
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Good
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <AirQualityIcon sx={{ fontSize: 50, color: '#4caf50' }} />
          <Typography variant="h6" component="h2" gutterBottom>
            Indoor Air Quality
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Very Good
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <WasteIcon sx={{ fontSize: 50, color: '#4caf50' }} />
          <Typography variant="h6" component="h2" gutterBottom>
            Resource & Waste Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Excellent
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <LocationIcon sx={{ fontSize: 50, color: '#4caf50' }} />
          <Typography variant="h6" component="h2" gutterBottom>
            Location Analysis
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Poor
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EcoReport;
