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
    location: {
      transport: '',
      green: '',
      overall: ''
    },
    finalRating: ''
  });
  const [infoCardContent, setInfoCardContent] = useState({
    energyEfficiency: {
      lighting: '',
      appliancesAndElectronics: '',
      percentages: [] as number[],
      labels: [] as string[],
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
      percentages: [] as number[],
      labels: [] as string[],
      overall: ''
    },
    location: {
      transport: '',
      green: '',
      overall: ''
    }
  });

  useEffect(() => {
    if (queryData){
      const parsedData = JSON.parse(queryData as string);
      console.log(queryData)
      setEcoChampion("Green Advocate"); // Adjust according to your response structure
      const getLightingPercentages = (text) => {
        const breakdownRegex = /(\w+):\s*(\d+)%/g;
  
  let match;
  const labels = [];
  const percentages = [];

  // Loop through all matches
  while ((match = breakdownRegex.exec(text)) !== null) {
    labels.push(match[1]);
    percentages.push(parseInt(match[2], 10));
  }

  return { labels, percentages };
      };

      const getMaterialPercentages = (text) => {
        const breakdownRegex = /(\w+):\s*(\d+)%/g;
        let match;
        const labels = [];
        const percentages = [];
    
        while ((match = breakdownRegex.exec(text)) !== null) {
          labels.push(match[1]);
          percentages.push(parseInt(match[2], 10));
        }
    
        return { labels, percentages };
      };

      const lightingPercentagesRaw = parsedData["Energy Efficiency"]["Lighting"]["Percentage Breakdown"];
      const { labels: lightLabels, percentages: lightPercentages } = getLightingPercentages(lightingPercentagesRaw);
      const materialPercentageRaw = parsedData["Resource Efficiency and Waste Management"]["Material Sustainability"]["Percentage Breakdown"]
      let materialLabels = ['concrete','wood']
      let materialPercentages = [75,25]
      if(materialPercentageRaw != 'Unknown'){
        const { labels: gotLabels, percentages: gotPercentages } = getMaterialPercentages(materialPercentageRaw);
        materialLabels = gotLabels
        materialPercentages = gotPercentages
      }
      
      
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
        location: {
          transport: parsedData["Location"]["Proximity to Public Transport"]["Rating"],
          green: parsedData["Location"]["Proximity to Green Spaces"]["Rating"],
          overall: parsedData["Location"]["Overall"]["Rating"],
        },
        finalRating: "Green Advocate",
      });
      setInfoCardContent({
        energyEfficiency: {
          lighting: parsedData["Energy Efficiency"]["Lighting"]["Justification"],
          appliancesAndElectronics: parsedData["Energy Efficiency"]["Appliances and Electronics"]["Justification"],
          percentages: lightPercentages as number[],
          labels: lightLabels as string[],
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
          percentages: materialPercentages,
          labels: materialLabels,
          overall: parsedData["Resource Efficiency and Waste Management"]["Overall"]["Justification"],
        },
        location: {
          transport: parsedData["Location"]["Proximity to Public Transport"]["Justification"],
          green: parsedData["Location"]["Proximity to Green Spaces"]["Justification"],
          overall: parsedData["Location"]["Proximity to Green Spaces"]["Justification"],
        },
      });
    }
}, [queryData]);

const handleAskQuestion = () => {
  router.push('/question-page');
};

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
        // percentages={infoCardContent.energyEfficiency.percentages}
        percentages={infoCardContent.energyEfficiency.percentages}
        labels={infoCardContent.energyEfficiency.labels}
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
        percentages={[30,40]}
        labels={["Volatile Organic Compounds (VOCs)","Particulate Matter (PM2.5)"]}
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
        percentages={infoCardContent.resourceEfficiency.percentages}
        labels={infoCardContent.resourceEfficiency.labels}
      />

      <InfoCard
        icon={LocationIcon}
        title="LOCATION ANALYSIS"
        overallRating={ratings.location.overall}
        overallJustification={infoCardContent.location.overall}
        sub_1= "Proximity to Public Transport"
        sub_1_rating= {ratings.location.transport}
        sub_1_just={infoCardContent.location.transport}
        sub_2= "Proximity to Green Spaces"
        sub_2_rating= {ratings.location.green}
        sub_2_just={infoCardContent.location.green}
        percentages={[30,40,30]}
        labels={["Number of Parks","Number of bus stops","Number of bikeshares"]}
      />
       <button
        onClick={handleAskQuestion}
        className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 mt-4 mx-auto"
      >
        Ask a Question
      </button>
    </div>
  );
}
