import React from 'react';
import { Typography } from '@material-ui/core';
import TextFieldSubmit from '../textFieldSubmit';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator/deliveryRouteCalculator';

interface Props {
  calculator: DeliveryRouteCalculator;
}

const ExactRouteCalculator: React.FC<Props> = ({ calculator }) => {
  return (
    <>
      <Typography gutterBottom variant="h5" component="h3">
        Case 1
      </Typography>
    </>
  );
};

export default ExactRouteCalculator;
