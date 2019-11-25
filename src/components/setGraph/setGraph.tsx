import React, { useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import InputGroup from '../inputGroup';

interface Props {
  onSelected: (routes: string) => void;
}

const SetGraph: React.FC<Props> = ({ onSelected }) => {
  const [value, setValue] = useState("AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1");
  return (
    <>
      <Typography gutterBottom variant="h5" component="h3">
        Enter graph
    </Typography>
      <InputGroup>
        <TextField
          fullWidth
          onChange={(event) => { setValue(event.currentTarget.value); }}
          value={value}
          margin="none"
          variant="outlined"
        />
        <Button
          onClick={() => {
            onSelected(value);
          }}
          variant="contained"
          size="large"
          color="primary"
        >
          Sumbit
        </Button>
      </InputGroup>
    </>
  );
};

export default SetGraph;
