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
  path: string[],
  selectedTab: number,
  maxStops: number,
) => {
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  useMemo(() => {
    if (path.length < 2) {
      setResultMessage('');
      return;
    }
    // eslint-disable-next-line default-case
    switch (selectedTab) {
      case 0: {
        const cost = calculator.graph.getDeliveryCost(path);
        setResultMessage(cost !== null ? `The cost is ${cost}` : 'No such route');
        break;
      }
      case 1: {
        const [from, to] = path;
        const paths = calculator.graph.getPossiblePaths(from, to, {
          maxLength: maxStops > 0 ? maxStops : undefined,
        });
        setResultMessage(`The possible routes are ${paths.length}`);
        break;
      }
      case 2: {
        const [from, to] = path;
        const paths = calculator.graph.getShortestPath(from, to);
        const cost = paths ? paths.totalWeight : null;
        setResultMessage(cost !== null ? `The cost for the cheapest delivery route is ${cost}` : 'No such route');
        break;
      }
    }
  }, [path, selectedTab, maxStops, calculator]);
  return resultMessage;
};

const useRest = (
  setCity: (value: string) => void,
  setPath: (value: string[]) => void,
  setMaxStops: (value: number) => void,
) => useCallback(() => {
  setCity('-1');
  setMaxStops(-1);
  setPath([]);
}, [setCity, setPath, setMaxStops]);

const useAddCity = (
  setCity: (value: string) => void,
  setPath: (value: string[]) => void,
  path: string[],
  city: string,
) => useCallback(() => {
  setCity('-1');
  setPath([
    ...path,
    city,
  ]);
}, [setCity, setPath, path, city]);

const useChangeTab = (
  reset: () => void,
  setSelectedTab: (value: number) => void,
) => useCallback((tab: number) => {
  setSelectedTab(tab);
  reset();
}, [reset, setSelectedTab]);

const RouteCalculator: React.FC<Props> = ({ calculator }) => {
  const [path, setPath] = useState<string[]>(() => []);
  const [city, setCity] = useState('-1');
  const [maxStops, setMaxStops] = useState(-1);
  const [selectedTab, setSelectedTab] = useState(0);
  const cities = useCities(calculator);
  const resultMessage = useResultMessage(calculator, path, selectedTab, maxStops);
  const reset = useRest(setCity, setPath, setMaxStops);
  const addCity = useAddCity(setCity, setPath, path, city);
  const changeTab = useChangeTab(reset, setSelectedTab);
  const classes = useStyles();
  // we allow multi cities in case 1 only
  const canAddCity = city !== '-1' && (selectedTab === 0 || path.length < 2);
  // show max stops dropdown for case 2 only
  const showMaxStops = selectedTab === 1;

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
        <Stepper path={path} />
        <Controls
          showMaxStops={showMaxStops}
          addCity={addCity}
          canAddCity={canAddCity}
          onReset={reset}
          onCityChange={setCity}
          selectedCity={city}
          cities={cities}
          selectedMaxStops={maxStops}
          onMaxStopsChange={setMaxStops}
        />
        <p>{resultMessage}</p>
      </Box>
    </Box>
  );
};

export default RouteCalculator;
