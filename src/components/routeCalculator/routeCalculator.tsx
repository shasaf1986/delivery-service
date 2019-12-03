import React, { useState, useMemo } from 'react';
import {
  Typography, Box, createStyles, makeStyles,
} from '@material-ui/core';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator/deliveryRouteCalculator';
import Path from '../path';
import Controls from './controls';
import VerticalTabs from '../verticalTabs';

const tabs = ['CASE 1', 'CASE 2', 'CASE 3'];

const getResultMessage = (
  path: string[], mode: number, maxStops: number,
  calculator: DeliveryRouteCalculator,
) => {
  if (path.length < 2) {
    return '';
  }
  switch (mode) {
    case 0: {
      const cost = calculator.getDeliveryCost(path);
      return cost !== null ? `The cost is ${cost}` : 'No such route';
    }
    case 1: {
      const [from, to] = path;
      const count = calculator.getPossibleDeliveryRoutes(from, to, {
        maxStops: maxStops > 0 ? maxStops : undefined,
      });
      return `The possible routes are ${count}`;
    }
    case 2: {
      const [from, to] = path;
      const cost = calculator.getCheapestDeliveryRoute(from, to);
      return cost !== null ? `The cost for the cheapest delivery route is ${cost}` : 'No such route';
    }
    default: {
      throw new Error('unknown case');
    }
  }
};

const useStyles = makeStyles(
  createStyles({
    tabs: {
      margin: '-16px 15px -16px -16px',
    },
  }),
);

interface Props {
  calculator: DeliveryRouteCalculator;
}
const RouteCalculator: React.FC<Props> = ({ calculator }) => {
  const classes = useStyles();
  const [path, setPath] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [maxStops, setMaxStops] = useState(-1);
  const [mode, setMode] = useState(0);
  const cities = useMemo(() => calculator.getCities(), [calculator]);
  const resultMessage = useMemo(() => getResultMessage(path, mode, maxStops, calculator), [
    path, mode, maxStops, calculator,
  ]);
  const reset = () => {
    setCity('');
    setMaxStops(-1);
    setPath([]);
  };
  // we allow multi cities in case 1 only
  const canAddCity = !!city && (mode === 0 || path.length < 2);
  // show max stops dropdown for case 2 only
  const showMaxStops = mode === 1;

  return (
    <Box display="flex">
      <VerticalTabs
        className={classes.tabs}
        tabs={tabs}
        selectedTab={mode}
        onChange={(newMode) => {
          setMode(newMode);
          reset();
        }}
      />
      <Box flex="1">
        <Typography gutterBottom variant="h5" component="h3">
          {tabs[mode]}
        </Typography>
        <Path path={path} />
        <Controls
          showMaxStops={showMaxStops}
          addCity={() => {
            setCity('');
            setPath([
              ...path,
              city,
            ]);
          }}
          canAddCity={canAddCity}
          onReset={reset}
          onCityChange={setCity}
          selectedCity={city}
          cities={cities}
          selectedMaxStops={maxStops}
          onMaxStopsChange={setMaxStops}
        />
        <p data-testid="result-message">{resultMessage}</p>
      </Box>
    </Box>
  );
};

export default RouteCalculator;
