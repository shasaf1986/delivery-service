import React from 'react';
import {
  Typography, Box, createStyles, makeStyles,
} from '@material-ui/core';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator/deliveryRouteCalculator';
import Stepper from '../stepper';
import Controls from './controls';
import VerticalTabs from '../verticalTabs';
import useDeliveryRouteCalculator from './useDeliveryRouteCalculator';

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

const RouteCalculator: React.FC<Props> = ({ calculator }) => {
  const classes = useStyles();
  const {
    addCity, canAddCity, path, setCity,
    changeMode, cities, city, maxStops, mode, reset, resultMessage, setMaxStops, showMaxStops,
  } = useDeliveryRouteCalculator(calculator);

  return (
    <Box display="flex">
      <VerticalTabs
        className={classes.tabs}
        tabs={tabs}
        selectedTab={mode}
        onChange={changeMode}
      />
      <Box flex="1">
        <Typography gutterBottom variant="h5" component="h3">
          {tabs[mode]}
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
