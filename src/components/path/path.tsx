import React from 'react';
import { Stepper } from '@material-ui/core';
import Node from './node';

interface Props {
  path: string[];
}

const Path: React.FC<Props> = ({ path }) => {
  const shouldAddFirstStep = path.length === 0;
  const shouldAddLastStep = path.length < 2;

  return (
    <Stepper>
      {shouldAddFirstStep && <Node label="?" disabled showAnimation={false} />}
      {
        path.map((node, index) => <Node key={index.toString()} label={node} disabled={false} />)
      }
      {shouldAddLastStep && <Node label="?" disabled showAnimation={false} />}
    </Stepper>
  );
};

export default Path;
