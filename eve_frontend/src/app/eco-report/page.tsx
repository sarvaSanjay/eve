import React, { useState, useEffect } from 'react';
import InfoCard from '@/components/Energy';
import EcoReport from '@/components/HelloWorld';
import { useRouter } from 'next/router';
import {
  Bolt as EnergyIcon,
  Home as AirQualityIcon,
  Recycling as WasteIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

export default function EcoReportPage() {
  const router = useRouter();
  const { data } = router.query;

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
    // const socket = io('http://100.66.219.234:5000/'); // Replace with your server URL
  
    // socket.on('connect', () => {
    //   console.log('Connected to WebSocket');
    // });
  
    // socket.on('send_eco_report', (data) => {
    if (data){
      const parsedData = JSON.parse(data as string);
      setEcoChampion(parsedData["Final Rating"]["Rating"]); // Adjust according to your response structure
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
        finalRating: parsedData["Final Rating"]["Rating"],
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
        finalRating: parsedData["Final Rating"]["Justification"],
      });
    }
}, [data]);

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
