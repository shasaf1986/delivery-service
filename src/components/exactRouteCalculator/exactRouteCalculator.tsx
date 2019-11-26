import React, { useState, useMemo, useCallback } from 'react';
import {
  Typography, Box, createStyles, makeStyles,
} from '@material-ui/core';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator/deliveryRouteCalculator';
import Stepper from '../stepper';
import Controls from './controls';
import VerticalTabs from '../verticalTabs';

interface Props {
  calculator: DeliveryRouteCalculator;
}

const tabs = ['Case 1', 'Case 2', 'Case 3'];

const useStyles = makeStyles(
  createStyles({
    tabs: {
      margin: '-16px 15px -16px -16px',
    },
  }),
);
const useCities = (calculator: DeliveryRouteCalculator) => useMemo(() => {
  const citiesFromGraph: string[] = [];
  calculator.graph.graph.forEach((_, city) => {
    citiesFromGraph.push(city);
  });
  return citiesFromGraph;
}, [calculator]);

const useResultMessage = (
  calculator: DeliveryRouteCalculator,
  lables: string[],
  selectedTab: number,
) => {
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  useMemo(() => {
    if (lables.length < 2) {
      setResultMessage('');
      return;
    }
    switch (selectedTab) {
      case 0: {
        const cost = calculator.graph.getDeliveryCost(lables);
        setResultMessage(cost !== null ? `The cost is ${cost}` : 'No such route');
        break;
      }
      case 1: {

      }
      case 2: {

      }
      default: {

      }
    }
  }, [lables, selectedTab]);
  return resultMessage;
};

const useRest = (setCity: (value: string) => void, setLables: (value: string[]) => void) => useCallback(() => {
  setCity('-1');
  setLables([]);
}, [setCity, setLables]);

const useAddCity = (
  setCity: (value: string) => void,
  setLables: (value: string[]) => void,
  labels: string[],
  city: string,
) => useCallback(() => {
  setCity('-1');
  setLables([
    ...labels,
    city,
  ]);
}, [setCity, setLables, labels, city]);

const useChangeTab = (reset: () => void, setSelectedTab: (value: number) => void) => useCallback((tab: number) => {
  setSelectedTab(tab);
  reset();
}, [reset, setSelectedTab]);

const ExactRouteCalculator: React.FC<Props> = ({ calculator }) => {
  const [labels, setLables] = useState<string[]>(() => []);
  const [city, setCity] = useState('-1');
  const [selectedTab, setSelectedTab] = useState(0);
  const cities = useCities(calculator);
  const resultMessage = useResultMessage(calculator, labels, selectedTab);
  const reset = useRest(setCity, setLables);
  const addCity = useAddCity(setCity, setLables, labels, city);
  const changeTab = useChangeTab(reset, setSelectedTab);
  const classes = useStyles();

  return (
    <Box marginRight="10px" display="flex">
      <VerticalTabs
        className={classes.tabs}
        tabs={tabs}
        selectedTab={selectedTab}
        onChange={changeTab}
      />
      <Box flex="1">
        <Typography gutterBottom variant="h5" component="h3">
          {tabs[selectedTab]}
        </Typography>
        <Stepper lables={labels} />
        <Controls
          addCity={addCity}
          canAddCity={city !== '-1'}
          onReset={reset}
          onCityChange={setCity}
          selectedCity={city}
          cities={cities}
        />
        <p>{resultMessage}</p>
      </Box>
    </Box>
  );
};

export default ExactRouteCalculator;
