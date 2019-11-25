import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import SetGraph from '../setGraph';

const useStyles = makeStyles(
  createStyles({
    paper: {
      padding: '24px 16px'
    },
  }),
);

const DeliveryService: React.FC = () => {
  const classes = useStyles();
  return (
    <Typography component="div" >
      <Typography variant="h3" gutterBottom>
        Delivery Service
      </Typography>
      <Paper className={classes.paper} >
        <SetGraph onSelected={(routes) => {
          console.log(routes);
        }} />
      </Paper>
    </Typography>
  );
};

export default DeliveryService;
