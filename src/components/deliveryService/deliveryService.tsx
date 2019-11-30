import React, { useRef, useState } from 'react';
import { Typography, Paper } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import SetGraph from '../setGraph';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator';
import RouteCalculator from '../routeCalculator';

const useStyles = makeStyles(
  createStyles({
    paper: {
      padding: '16px 16px',
    },
  }),
);

const DeliveryService: React.FC = () => {
  const [isGraphReady, setIsGraphReady] = useState(false);
  const calculatorRef = useRef<DeliveryRouteCalculator | undefined>();
  const calculator = calculatorRef.current;
  const classes = useStyles();

  return (
    <Typography component="div">
      <Typography variant="h3" gutterBottom>
        Delivery Service
      </Typography>
      <Paper className={classes.paper}>
        {!isGraphReady && (
          <SetGraph onSelected={(rawGraph) => {
            try {
              calculatorRef.current = new DeliveryRouteCalculator(rawGraph);
              setIsGraphReady(true);
            } catch (error) {
              alert('Wrong input');
            }
          }}
          />
        )}
        {isGraphReady && <RouteCalculator calculator={calculator!} />}
      </Paper>
    </Typography>
  );
};

export default DeliveryService;
