import React, { useState, useMemo } from 'react';
import {
  Typography, Button, Select, Tabs, Tab, Box, createStyles, makeStyles,
} from '@material-ui/core';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator/deliveryRouteCalculator';
import Stepper from '../stepper';
import InputGroup from '../inputGroup';
import SideBar from './sideBar';

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
    if (labels.length === 2) {
      const cost = calculator.graph.getDeliveryCost(labels);
      console.log(cost);
    }
    console.log(labels);
  }, [
    labels
  ]);

  const canAddCity = city !== '-1';
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
      <SideBar tabs={tabs} selectedTab={selectedTab} onChange={(tab) => {
        setSelectedTab(tab);
      }} />
      <Box flex="1">
        <Typography gutterBottom variant="h5" component="h3">
          {tabs[selectedTab]}
        </Typography>
        <Stepper lables={labels} />
        <InputGroup>
          <Select
            native
            value={city}
            onChange={(event) => {
              // @ts-ignore
              setCity(event.currentTarget.value);
            }}
            variant="outlined"
          >
            <option value="-1">City</option>
            {
              cities.map((city) => <option key={city} value={city}>{city}</option>)
            }
          </Select>
          <Button
            onClick={addCity}
            variant="contained"
            color="primary"
            size="large"
            disabled={!canAddCity}
          >
            Add city
          </Button>
          <Button
            onClick={rest}
            // variant="contained"
            size="large"
          >
            Reset
          </Button>
        </InputGroup>
      </Box>

    </Box>
  );
};

export default ExactRouteCalculator;
