import React, { useMemo } from 'react';
import { Typography, Stepper as OriginStepper, StepLabel, Box, makeStyles, createStyles } from '@material-ui/core';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator/deliveryRouteCalculator';
import Step from './components/step';

interface Props {
  // calculator: DeliveryRouteCalculator;
  lables: string[];
}

const Stepper: React.FC<Props> = ({ lables }) => {
  const shouldAddFirstLabel = lables.length === 0;
  const shouldAddLastLabel = lables.length === 0 || lables.length === 1;

  return (
    <OriginStepper >
      {shouldAddFirstLabel && <Step label="?" disabled={true} />}
      {
        lables.map((label, index) => <Step key={index.toString()} label={label} disabled={false} />)
      }
      {shouldAddLastLabel && <Step label="?" disabled={true} />}
    </OriginStepper>
  );
};

export default Stepper;
