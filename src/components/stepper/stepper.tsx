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
  const shouldAddFirstStep = path.length === 0;
  const shouldAddLastStep = path.length < 2;

  return (
    <OriginStepper>
      {shouldAddFirstStep && <Step label="?" disabled />}
      {
        path.map((node, index) => <Step key={index.toString()} label={node} disabled={false} />)
      }
      {shouldAddLastStep && <Step label="?" disabled />}
    </OriginStepper>
  );
};

export default Stepper;
