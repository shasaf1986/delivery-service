import React from 'react';
import {
  Stepper as OriginStepper,
} from '@material-ui/core';
import Step from './step';

interface Props {
  // calculator: DeliveryRouteCalculator;
  path: string[];
}

const Stepper: React.FC<Props> = ({ path }) => {
  const shouldAddFirstLabel = path.length === 0;
  const shouldAddLastLabel = path.length === 0 || path.length === 1;

  return (
    <OriginStepper>
      {shouldAddFirstLabel && <Step label="?" disabled />}
      {
        path.map((node, index) => <Step key={index.toString()} label={node} disabled={false} />)
      }
      {shouldAddLastLabel && <Step label="?" disabled />}
    </OriginStepper>
  );
};

export default Stepper;
