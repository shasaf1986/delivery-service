import React, { useState, useMemo } from 'react';
import {
  Typography, Button, Select, Tabs, Tab, Box, createStyles, makeStyles,
} from '@material-ui/core';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator/deliveryRouteCalculator';
import Stepper from '../stepper';
import SideBar from './sideBar';
import Controls from './controls';

interface Props {
  calculator: DeliveryRouteCalculator;
}

const tabs = ['Case 1', 'Case 2', 'Case 3'];
const ExactRouteCalculator: React.FC<Props> = ({ calculator }) => {
  const [labels, setLables] = useState<string[]>(() => []);
  const [city, setCity] = useState('-1');
  const [selectedTab, setSelectedTab] = useState(0);

  const cities = useMemo(() => {
    const citiesFromGraph: string[] = [];
    calculator.graph.graph.forEach((_, city) => {
      citiesFromGraph.push(city);
    });
    return citiesFromGraph;
  }, []);
  useMemo(() => {
    if (labels.length < 2) {
      return;
    }
    const cost = calculator.graph.getDeliveryCost(labels);
    console.log(cost);
  }, [
    labels,
  ]);
  const addCity = () => {
    setCity('-1');
    setLables([
      ...labels,
      city,
    ]);
  };
  const rest = () => {
    setCity('-1');
    setLables([]);
  };
  return (
    <Box marginRight="10px" display="flex">
      <SideBar
        tabs={tabs}
        selectedTab={selectedTab}
        onChange={(tab) => {
          setSelectedTab(tab);
        }}
      />
      <Box flex="1">
        <Typography gutterBottom variant="h5" component="h3">
          {tabs[selectedTab]}
        </Typography>
        <Stepper lables={labels} />
        <Controls
          addCity={addCity}
          canAddCity={city !== '-1'}
          onReset={rest}
          onCityChange={(city) => {
            setCity(city);
          }}
          selectedCity={city}
          cities={cities}
        />
      </Box>
    </Box>
  );
};

export default ExactRouteCalculator;
