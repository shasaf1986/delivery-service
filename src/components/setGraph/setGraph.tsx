import React, { useState } from 'react';
import {
  Typography, TextField, Button, createStyles, makeStyles, Grid,
} from '@material-ui/core';

interface Props {
  onSelected: (routes: string) => void;
}

const SetGraph: React.FC<Props> = ({ onSelected }) => {
  const [value, setValue] = useState('AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1');
  return (
    <>
      <Typography gutterBottom variant="h5" component="h3">
        Enter graph
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={10} md={6}>
          <TextField
            onChange={(event) => { setValue(event.currentTarget.value); }}
            value={value}
            fullWidth
            margin="dense"
            variant="outlined"
            label="Graph"
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </>
  );
};

export default SetGraph;
