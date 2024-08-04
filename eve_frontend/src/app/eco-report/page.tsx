'use client';

import React, { useState, useEffect } from 'react';
import InfoCard from '@/components/Energy';
import EcoReport from '@/components/HelloWorld';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Bolt as EnergyIcon,
  Home as AirQualityIcon,
  Recycling as WasteIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

export default function EcoReportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryData = searchParams.get('data')

  const [ecoChampion, setEcoChampion] = useState('');
  const [ratings, setRatings] = useState({
    energyEfficiency: {
      lighting: '',
      appliancesAndElectronics: '',
      overall: ''
    },
    indoorAirQuality: {
      airQuality: '',
      materials: '',
      overall: ''
    },
    resourceEfficiency: {
      materialSustainability: '',
      wasteManagement: '',
      overall: ''
    },
    finalRating: ''
  });
  const [infoCardContent, setInfoCardContent] = useState({
    energyEfficiency: {
      lighting: '',
      appliancesAndElectronics: '',
      overall: ''
    },
    indoorAirQuality: {
      airQuality: '',
      materials: '',
      overall: ''
    },
    resourceEfficiency: {
      materialSustainability: '',
      wasteManagement: '',
      overall: ''
    },
    finalRating: ''
  });

  useEffect(() => {
    // const socket = io('http://100.66.219.234:5000/'); // Replace with your server URL
  
    // socket.on('connect', () => {
    //   console.log('Connected to WebSocket');
    // });
  
    // socket.on('send_eco_report', (data) => {
    if (queryData){
      const parsedData = JSON.parse(queryData as string);
      console.log(queryData)
      // setEcoChampion(parsedData["Final Rating"]["Rating"]); // Adjust according to your response structure
      setRatings({
        energyEfficiency: { 
          lighting: parsedData["Energy Efficiency"]["Lighting"]["Rating"],
          appliancesAndElectronics: parsedData["Energy Efficiency"]["Appliances and Electronics"]["Rating"],
          overall: parsedData["Energy Efficiency"]["Overall"]["Rating"],
        },
        indoorAirQuality: {
          airQuality: parsedData["Indoor Air Quality"]["Air Quality"]["Rating"],
          materials: parsedData["Indoor Air Quality"]["Materials"]["Rating"],
          overall: parsedData["Indoor Air Quality"]["Overall"]["Rating"],
        },
        resourceEfficiency: {
          materialSustainability: parsedData["Resource Efficiency and Waste Management"]["Material Sustainability"]["Rating"],
          wasteManagement: parsedData["Resource Efficiency and Waste Management"]["Waste Management"]["Rating"],
          overall: parsedData["Resource Efficiency and Waste Management"]["Overall"]["Rating"],
        },
        finalRating: "",
      });
      setInfoCardContent({
        energyEfficiency: {
          lighting: parsedData["Energy Efficiency"]["Lighting"]["Justification"],
          appliancesAndElectronics: parsedData["Energy Efficiency"]["Appliances and Electronics"]["Justification"],
          overall: parsedData["Energy Efficiency"]["Overall"]["Justification"],
        },
        indoorAirQuality: {
          airQuality: parsedData["Indoor Air Quality"]["Air Quality"]["Justification"],
          materials: parsedData["Indoor Air Quality"]["Materials"]["Justification"],
          overall: parsedData["Indoor Air Quality"]["Overall"]["Justification"],
        },
        resourceEfficiency: {
          materialSustainability: parsedData["Resource Efficiency and Waste Management"]["Material Sustainability"]["Justification"],
          wasteManagement: parsedData["Resource Efficiency and Waste Management"]["Waste Management"]["Justification"],
          overall: parsedData["Resource Efficiency and Waste Management"]["Overall"]["Justification"],
        },
        finalRating: "",
      });
    }
}, [queryData]);

  return (
    <div>
      <EcoReport ecoChampion={ecoChampion} ratings={ratings}/>
      <InfoCard
        icon={EnergyIcon}
        title="ENERGY EFFICIENCY"
        overallRating={ratings.energyEfficiency.overall}
        overallJustification={infoCardContent.energyEfficiency.overall}
        sub_1= "Lighting"
        sub_1_rating= {ratings.energyEfficiency.lighting}
        sub_1_just={infoCardContent.energyEfficiency.lighting}
        sub_2= "Appliances and Electronics"
        sub_2_rating= {ratings.energyEfficiency.appliancesAndElectronics}
        sub_2_just={infoCardContent.energyEfficiency.appliancesAndElectronics}
        bgcolor='#98BF64'
        iconcolor='#fff'
      />
      <InfoCard
        icon={AirQualityIcon}
        title="INDOOR AIR QUALITY"
        overallRating={ratings.indoorAirQuality.overall}
        overallJustification={infoCardContent.indoorAirQuality.overall}
        sub_1= "Air Quality"
        sub_1_rating= {ratings.indoorAirQuality.airQuality}
        sub_1_just={infoCardContent.indoorAirQuality.airQuality}
        sub_2= "Materials"
        sub_2_rating= {ratings.indoorAirQuality.materials}
        sub_2_just={infoCardContent.indoorAirQuality.materials}
        bgcolor='#fff'
        iconcolor='#98BF64'
      />
      <InfoCard
        icon={WasteIcon}
        title="RESOURCE AND WASTE MANAGEMENT"
        overallRating={ratings.resourceEfficiency.overall}
        overallJustification={infoCardContent.resourceEfficiency.overall}
        sub_1= "Material Sustainability"
        sub_1_rating= {ratings.resourceEfficiency.materialSustainability}
        sub_1_just={infoCardContent.resourceEfficiency.materialSustainability}
        sub_2= "Waste Management"
        sub_2_rating= {ratings.resourceEfficiency.wasteManagement}
        sub_2_just={infoCardContent.resourceEfficiency.wasteManagement}
        bgcolor='#98BF64'
        iconcolor='#fff'
      />

      {/* <InfoCard
        icon={LocationIcon}
        title="LOCATION ANALYSIS"
        overallRating={ratings.energyEfficiency.overall}
        overallJustification={infoCardContent.energyEfficiency.overall}
        sub_1= "Material Sustainability"
        sub_1_rating= {ratings.resourceEfficiency.materialSustainability}
        sub_1_just={infoCardContent.resourceEfficiency.materialSustainability}
        sub_2= "Waste Management"
        sub_2_rating= {ratings.resourceEfficiency.wasteManagement}
        sub_2_just={infoCardContent.resourceEfficiency.wasteManagement}
        bgcolor='#fff'
        iconcolor='#98BF64'
      /> */}
      
    </div>
  );
}
