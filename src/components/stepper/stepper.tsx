import React from 'react';
import {
  Stepper as OriginStepper,
} from '@material-ui/core';
import Step from './step';

interface Props {
  // calculator: DeliveryRouteCalculator;
  lables: string[];
}

const Stepper: React.FC<Props> = ({ lables }) => {
  const shouldAddFirstLabel = lables.length === 0;
  const shouldAddLastLabel = lables.length === 0 || lables.length === 1;

  return (
    <OriginStepper>
      {shouldAddFirstLabel && <Step label="?" disabled />}
      {
        lables.map((label, index) => <Step key={index.toString()} label={label} disabled={false} />)
      }
      {shouldAddLastLabel && <Step label="?" disabled />}
    </OriginStepper>
  );
};

export default Stepper;
