import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  Bolt as EnergyIcon,
  Home as AirQualityIcon,
  Recycling as WasteIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import Gold from '../../public/Gold.png';

const backgroundPattern = 'url("data:image/svg+xml,%3Csvg width=\'10\' height=\'10\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%2398BF64\' fill-opacity=\'0.4\'%3E%3Ccircle cx=\'5\' cy=\'5\' r=\'2\'/%3E%3C/g%3E%3C/svg%3E")';

const EcoReport = () => {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          backgroundColor: '#98BF64',
          backgroundImage: backgroundPattern,
        }}
      >
        <Box textAlign="center">
          <Typography variant="h2" component="h1" className='font-economica' gutterBottom>
            Your Environmental Sustainability and Efficiency Report
          </Typography>
          <Typography variant="h4" component="p" color="textSecondary" className='font-economica'>
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
          <Typography variant="h4" component="span" className='font-economica' mt={2}>
            Eco-Champion
          </Typography>
        </Box>
      </Paper>
      <Grid container spacing={3} mt={4}>
        <Grid item xs={6} textAlign="center">
          <EnergyIcon sx={{ fontSize: 100, color: '#4caf50' }} />
          <Typography variant="h5" component="h2" className='font-economica' gutterBottom>
            Energy Efficiency
          </Typography>
          <Typography variant="h5" className='font-economica' color="textSecondary">
            Good
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <AirQualityIcon sx={{ fontSize: 100, color: '#4caf50' }} />
          <Typography variant="h5" component="h2" className='font-economica' gutterBottom>
            Indoor Air Quality
          </Typography>
          <Typography variant="h5" className='font-economica' color="textSecondary">
            Very Good
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <WasteIcon sx={{ fontSize: 100, color: '#4caf50' }} />
          <Typography variant="h5" component="h2" className='font-economica' gutterBottom>
            Resource & Waste Management
          </Typography>
          <Typography variant="h5" className='font-economica' color="textSecondary">
            Excellent
          </Typography>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <LocationIcon sx={{ fontSize: 100, color: '#4caf50' }} />
          <Typography variant="h5" component="h2" className='font-economica' gutterBottom>
            Location Analysis
          </Typography>
          <Typography variant="h5" className='font-economica' color="textSecondary">
            Poor
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default EcoReport;
