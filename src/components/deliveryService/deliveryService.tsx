import React, { useRef, useState } from 'react';
import { Typography, Paper } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import SetGraph from '../setGraph';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator/deliveryRouteCalculator';

const useStyles = makeStyles(
  createStyles({
    paper: {
      padding: '24px 16px',
    },
  }),
);

const DeliveryService: React.FC = () => {
  const [mode, setMode] = useState<'initial' | 'case1' | 'case2' | 'case3'>('initial');
  const deliveryRouteCalculator = useRef<DeliveryRouteCalculator | undefined>();

  const classes = useStyles();
  return (
    <Typography component="div">
      <Typography variant="h3" gutterBottom>
        Delivery Service
      </Typography>
      {mode === 'initial' && <Paper className={classes.paper}>
        <SetGraph onSelected={(routes) => {
          deliveryRouteCalculator.current = new DeliveryRouteCalculator(routes);
          setMode('case1');
        }}
        />
      </Paper>}
    </Typography>
  );
};

export default DeliveryService;
