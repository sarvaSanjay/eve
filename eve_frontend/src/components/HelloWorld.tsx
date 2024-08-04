import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  Bolt as EnergyIcon,
  Home as AirQualityIcon,
  Recycling as WasteIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import RadarChartComponent from '../components/graph';

const backgroundPattern = 'url("data:image/svg+xml,%3Csvg width=\'10\' height=\'10\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%2398BF64\' fill-opacity=\'0.4\'%3E%3Ccircle cx=\'5\' cy=\'5\' r=\'2\'/%3E%3C/g%3E%3C/svg%3E")';


const EcoReport = ({ ecoChampion, ratings, energy,air,waste,location }) => {
  return (
    <>
      <Paper
        className="bg-gradient-to-r from-green-400 via-green-100 to-green-400"
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
          <div style={{ paddingLeft: '15rem', paddingBottom: '10px', paddingTop: '10px' }}>
          <RadarChartComponent />
          </div>
          <Typography variant="h4" component="span" className='font-economica' mt={2}>
            {ecoChampion}
            {/* Eco-Champion */}
          </Typography>
        </Box>
      </Paper>
      <div className="p-6 bg-gray-100 min-h-screen">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg">
      <EnergyIcon sx={{ fontSize: 100, color: '#4caf50' }} />
      <h2 className="font-economica text-gray-800 mt-4 text-3xl">Energy Efficiency</h2>
      <p className="font-economica text-green-600 text-xl">{energy}</p>
      {/* <p className="font-economica text-green-600 text-xl">{ratings.energyEfficiency}</p> */}
    </div>
    <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg">
      <AirQualityIcon sx={{ fontSize: 100, color: '#4caf50' }} />
      <h2 className="font-economica text-gray-800 mt-4  text-3xl">Indoor Air Quality</h2>
      <p className="font-economica text-green-700 text-xl">{air}</p>
      {/* <p className="font-economica text-green-700 text-xl">{ratings.indoorAirQuality}</p> */}
    </div>
    <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg">
    <WasteIcon sx={{ fontSize: 100, color: '#4caf50' }} />
      <h2 className="font-economica text-gray-800 mt-4  text-3xl">Resource & Waste Management</h2>
      <p className="font-economica text-green-800 text-xl">{waste}</p>
      {/* <p className="font-economica text-green-800 text-xl">{ratings.wasteManagement}</p> */}
    </div>
    <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg">
    <LocationIcon sx={{ fontSize: 100, color: '#4caf50' }} />
      <h2 className="font-economica text-gray-800 mt-4  text-3xl">Location Analysis</h2>
      <p className="font-economica text-red-600 text-xl">{location}</p>
      {/* <p className="font-economica text-red-600 text-xl">{ratings.locationAnalysis}</p> */}
    </div>
  </div>
</div>
    </>
  );
};

export default EcoReport;
