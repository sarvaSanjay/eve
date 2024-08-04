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
  const [averageRatings, setAverageRatings] = useState({
    avgEnergyEfficiency: '',
    avgIndoorAirQuality: '',
    avgResourceEfficiency: '',
    avgFinalRating: ''
  });

  useEffect(() => {
    const socket = io('http://100.66.219.234:5000/'); // Replace with your server URL
  
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });
  
    socket.on('send_eco_report', (data) => {
      setEcoChampion(data.FinalRating.Rating); // Adjust according to your response structure
      setRatings({
        energyEfficiency: {
          lighting: data["Energy Efficiency"]["Lighting"]["Rating"],
          appliancesAndElectronics: data["Energy Efficiency"]["Appliances and Electronics"]["Rating"],
          overall: data["Energy Efficiency"]["Overall"]["Rating"],
        },
        indoorAirQuality: {
          airQuality: data["Indoor Air Quality"]["Air Quality"]["Rating"],
          materials: data["Indoor Air Quality"]["Materials"]["Rating"],
          overall: data["Indoor Air Quality"]["Overall"]["Rating"],
        },
        resourceEfficiency: {
          materialSustainability: data["Resource Efficiency and Waste Management"]["Material Sustainability"]["Rating"],
          wasteManagement: data["Resource Efficiency and Waste Management"]["Waste Management"]["Rating"],
          overall: data["Resource Efficiency and Waste Management"]["Overall"]["Rating"],
        },
        finalRating: data["Final Rating"]["Rating"],
      });
      setInfoCardContent({
        energyEfficiency: {
          lighting: data["Energy Efficiency"]["Lighting"]["Justification"],
          appliancesAndElectronics: data["Energy Efficiency"]["Appliances and Electronics"]["Justification"],
          overall: data["Energy Efficiency"]["Overall"]["Justification"],
        },
        indoorAirQuality: {
          airQuality: data["Indoor Air Quality"]["Air Quality"]["Justification"],
          materials: data["Indoor Air Quality"]["Materials"]["Justification"],
          overall: data["Indoor Air Quality"]["Overall"]["Justification"],
        },
        resourceEfficiency: {
          materialSustainability: data["Resource Efficiency and Waste Management"]["Material Sustainability"]["Justification"],
          wasteManagement: data["Resource Efficiency and Waste Management"]["Waste Management"]["Justification"],
          overall: data["Resource Efficiency and Waste Management"]["Overall"]["Justification"],
        },
        finalRating: data["Final Rating"]["Justification"],
      });
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
        overallRating={ratings.energyEfficiency.overall}
        overallJustification={infoCardContent.energyEfficiency.overall}
        subsections={{
          "Lighting": {
            rating: ratings.energyEfficiency.lighting,
            justification: infoCardContent.energyEfficiency.lighting
          },
          "Appliances and Electronics": {
            rating: ratings.energyEfficiency.appliancesAndElectronics,
            justification: infoCardContent.energyEfficiency.appliancesAndElectronics
          }
        }}
      />
      <InfoCard
        icon={AirQualityIcon}
        title="INDOOR AIR QUALITY"
        overallRating={ratings.indoorAirQuality.overall}
        overallJustification={infoCardContent.indoorAirQuality.overall}
        subsections={{
          "Air Quality": {
            rating: ratings.indoorAirQuality.airQuality,
            justification: infoCardContent.indoorAirQuality.airQuality
          },
          "Materials": {
            rating: ratings.indoorAirQuality.materials,
            justification: infoCardContent.indoorAirQuality.materials
          }
        }}
      />
      <InfoCard
        icon={WasteIcon}
        title="RESOURCE AND WASTE MANAGEMENT"
        overallRating={ratings.resourceEfficiency.overall}
        overallJustification={infoCardContent.resourceEfficiency.overall}
        subsections={{
          "Material Sustainability": {
            rating: ratings.resourceEfficiency.materialSustainability,
            justification: infoCardContent.resourceEfficiency.materialSustainability
          },
          "Waste Management": {
            rating: ratings.resourceEfficiency.wasteManagement,
            justification: infoCardContent.resourceEfficiency.wasteManagement
          }
        }}
      />

      {/* <InfoCard
        icon={LocationIcon}
        title="LOCATION ANALYSIS"
        overallRating={ratings.energyEfficiency.overall}
        overallJustification={infoCardContent.energyEfficiency.overall}
        subsections={{
          "Lighting": {
            rating: ratings.energyEfficiency.lighting,
            justification: infoCardContent.energyEfficiency.lighting
          },
          "Appliances and Electronics": {
            rating: ratings.energyEfficiency.appliancesAndElectronics,
            justification: infoCardContent.energyEfficiency.appliancesAndElectronics
          }
        }}
      /> */}
      
    </div>
  );
}
