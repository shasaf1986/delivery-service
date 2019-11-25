import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import TextFieldSubmit from '../textFieldSubmit';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator/deliveryRouteCalculator';
import Stepper from '../stepper';

interface Props {
  calculator: DeliveryRouteCalculator;
}

const ExactRouteCalculator: React.FC<Props> = ({ calculator }) => {
  console.log(calculator);
  const [labels, setLables] = useState<string[]>(() => []);
  return (
    <>
      <Typography gutterBottom variant="h5" component="h3">
        Case 1
      </Typography>
      <Stepper lables={labels} />
      <div>
        <Button
          onClick={() => {
            setLables([
              ...labels,
              'A'
            ]);
          }}
          variant="contained"
          color="primary"
        >
          Add city
        </Button>
      </div>
    </>
  );
};

export default ExactRouteCalculator;
