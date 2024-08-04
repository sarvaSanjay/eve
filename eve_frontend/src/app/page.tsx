import React, { useState, useEffect } from 'react';
import InfoCard from '@/components/Energy';
import EcoReport from '../components/HelloWorld';
import {
  Bolt as EnergyIcon,
  Home as AirQualityIcon,
  Recycling as WasteIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import io from 'socket.io-client';

export default function Home() {
  const [ecoChampion, setEcoChampion] = useState('');
  const [ratings, setRatings] = useState({
    energyEfficiency: '',
    indoorAirQuality: '',
    wasteManagement: '',
    locationAnalysis: ''
  });
  const [infoCardContent, setInfoCardContent] = useState({
    energyEfficiency: '',
    indoorAirQuality: '',
    wasteManagement: '',
    locationAnalysis: '',
    userRating: ''
  });
  const [averageRatings, setAverageRatings] = useState({
    avgEnergyEfficiency: '',
    avgIndoorAirQuality: '',
    avgWasteManagement: '',
    avgLocationAnalysis: ''
  });

  useEffect(() => {
    const socket = io('http://100.66.219.234:5000/'); // Replace with your server URL

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.on('eco-report', (data) => {
      setEcoChampion(data.ecoChampion);
      setRatings(data.ratings);
      setInfoCardContent(data.infoCards);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <EcoReport ecoChampion={ecoChampion} ratings={ratings}/>
      <InfoCard
        icon={EnergyIcon}
        title="ENERGY EFFICIENCY"
        content={infoCardContent.energyEfficiency || "Loading..."}
      />
      <InfoCard
        icon={AirQualityIcon}
        title="INDOOR AIR QUALITY"
        content={infoCardContent.indoorAirQuality || "Loading..."}
      />

      <InfoCard
        icon={WasteIcon}
        title="RESOURCE AND WASTE MANAGEMENT"
        content={infoCardContent.wasteManagement || "Loading..."}
      />

      <InfoCard
        icon={LocationIcon}
        title="LOCATION ANALYSIS"
        content={infoCardContent.locationAnalysis || "Loading..."}
      />
      
    </div>
  );
}
