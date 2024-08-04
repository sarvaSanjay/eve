"use client";
// import React, { useState, useEffect } from 'react';
import InfoCard from '@/components/Energy';
import EcoReport from '../components/HelloWorld';
import {
  Bolt as EnergyIcon,
  Home as AirQualityIcon,
  Recycling as WasteIcon,
  LocationOn as LocationIcon,
  Analytics,
} from '@mui/icons-material';
import InfoCardOther from '@/components/OtherCard';
import GradientBarChart from '@/components/graph';
// import io from 'socket.io-client';
import GradientLineChart from '../components/LineChart';


export default function Home() {
  // const [ecoChampion, setEcoChampion] = useState('');
  // const [ratings, setRatings] = useState({
  //   energyEfficiency: '',
  //   indoorAirQuality: '',
  //   wasteManagement: '',
  //   locationAnalysis: ''
  // });
  // const [infoCardContent, setInfoCardContent] = useState({
  //   energyEfficiency: '',
  //   indoorAirQuality: '',
  //   wasteManagement: '',
  //   locationAnalysis: '',
  //   userRating: ''
  // });
  // const [averageRatings, setAverageRatings] = useState({
  //   avgEnergyEfficiency: '',
  //   avgIndoorAirQuality: '',
  //   avgWasteManagement: '',
  //   avgLocationAnalysis: ''
  // });

  // useEffect(() => {
  //   const socket = io('http://100.66.219.234:5000/'); // Replace with your server URL

  //   socket.on('connect', () => {
  //     console.log('Connected to WebSocket');
  //   });

  //   socket.on('eco-report', (data) => {
  //     setEcoChampion(data.ecoChampion);
  //     setRatings(data.ratings);
  //     setInfoCardContent(data.infoCards);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from WebSocket');
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      beginAtZero: true,
      padding: {
        right: 35,
        bottom: 60
      }
    },
    scale: {
      gridLines: {
        circular: true
      }
    }
  };
  return (
    <div>
      {/* <GradientBarChart 
        userRating={"85"}
        averageRating={"85"}/> */}
        {/* <Analytics /> */}

       

{/*         
      <GradientChart data={data} /> */}
      {/* <GradientLineChart /> */}
      <EcoReport ecoChampion={"EcoChampion"} ratings={"85"} energy={"Good"}
      air={"Very Good"}
      waste={"Excellent"}
      location={"Poor"}/>
      <InfoCard
        icon={EnergyIcon}
        title="ENERGY EFFICIENCY"
        content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."|| "Loading..."}
        userRating={"85"}
        averageRating={"85"}
        bgcolor = '#98BF64'
        iconcolor = '#fff' 
      />
      <InfoCard
        icon={AirQualityIcon}
        title="INDOOR AIR QUALITY"
        content={"blah" || "Loading..."}
        userRating={"85"}
        averageRating={"85"}
        bgcolor = '#fff'
        iconcolor = '#98BF64' 
      />

      <InfoCard
        icon={WasteIcon}
        title="RESOURCE AND WASTE MANAGEMENT"
        content={"infoCardContent.wasteManagement" || "Loading..."}
        userRating={"85"}
        averageRating={"85"}
        bgcolor = '#98BF64'
        iconcolor = '#fff' 
      />

      <InfoCard
        icon={LocationIcon}
        title="LOCATION ANALYSIS"
        content={"infoCardContent.locationAnalysis" || "Loading..."}
        userRating={"85"}
        averageRating={"85"}
        bgcolor = '#fff'
        iconcolor = '#98BF64' 
      />
      
    </div>
  );
}
