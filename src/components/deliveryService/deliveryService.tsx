import React, { useRef, useState } from 'react';
import { Typography, Paper } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import SetGraph from '../setGraph';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator/deliveryRouteCalculator';
import ExactRouteCalculator from '../exactRouteCalculator';

const useStyles = makeStyles(
  createStyles({
    paper: {
      padding: '16px 16px',
    },
  }),
);

const DeliveryService: React.FC = () => {
  const [mode, setMode] = useState<'initial' | '1' | '1' | '3'>('initial');
  const calculatorRef = useRef<DeliveryRouteCalculator | undefined>();
  const calculator = calculatorRef.current;

  const classes = useStyles();
  return (
    <Typography component="div">
      <Typography variant="h3" gutterBottom>
        Delivery Service
      </Typography>
      <Paper className={classes.paper}>
        {mode === 'initial' && (
        <SetGraph onSelected={(routes) => {
          calculatorRef.current = new DeliveryRouteCalculator(routes);
          setMode('1');
        }}
        />
        )}
        {mode === '1' && <ExactRouteCalculator calculator={calculator!} />}
      </Paper>
    </Typography>
  );
};

export default DeliveryService;
