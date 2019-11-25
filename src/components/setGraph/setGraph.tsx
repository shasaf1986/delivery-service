import React from 'react';
import { Typography } from '@material-ui/core';
import TextFieldSubmit from '../textFieldSubmit';

interface Props {
  onSelected: (routes: string) => void;
}

const SetGraph: React.FC<Props> = ({ onSelected }) => {
  return (
    <>
      <Typography gutterBottom variant="h5" component="h3">
        Enter graph
      </Typography>
      <TextFieldSubmit
        onSubmit={onSelected}
        initialValue="AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1"
      />
    </>
  );
};

export default SetGraph;
