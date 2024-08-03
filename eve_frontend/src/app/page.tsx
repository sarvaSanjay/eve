import InfoCard from '@/components/Energy';
import EcoReport from '../components/HelloWorld';
import {
  Bolt as EnergyIcon,
  Home as AirQualityIcon,
  Recycling as WasteIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

export default function Home() {
  return (
    <div>
      <EcoReport />
      <InfoCard
        icon={EnergyIcon}
        title="ENERGY EFFICIENCY"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
              Curabitur pretium tincidunt lacus. Nulla gravida orci a odio."
      />
      <InfoCard
        icon={AirQualityIcon}
        title="INDOOR AIR QUALITY"
        content="Another content for Indoor Air Quality. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />

<InfoCard
        icon={WasteIcon}
        title="RESOURCE AND WASTE MANAGEMENT"
        content="Another content for Indoor Air Quality. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />

<InfoCard
        icon={LocationIcon}
        title="LOCATION ANALYSIS"
        content="Another content for Indoor Air Quality. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      
    </div>
  );
}
