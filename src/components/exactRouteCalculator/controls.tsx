import React, { useState, useMemo } from 'react';
import {
  Typography, Button, Select, Tabs, Tab, Box, createStyles, makeStyles, Grid,
} from '@material-ui/core';

interface Props {
  cities: string[];
  selectedCity: string;
  canAddCity: boolean;
  addCity: () => void;
  onReset: () => void;
  onCityChange: (city: string) => void;
}

const useStyles = makeStyles(
  createStyles({
    select: {
      width: '80px'
    },
  }),
);


const Controls: React.FC<Props> = ({
  cities, selectedCity, onReset, canAddCity,
  addCity, onCityChange,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid alignItems="center" spacing={1} container >
        <Grid item>
          <Select
            className={classes.select}
            native
            value={selectedCity}
            margin="dense"
            onChange={(event) => {
              // @ts-ignore
              onCityChange(event.currentTarget.value);
            }}
            variant="outlined"
          >
            <option value="-1">City</option>
            {
              cities.map((city) => <option key={city} value={city}>{city}</option>)
            }
          </Select>
        </Grid>
        <Grid item>
          <Button
            onClick={addCity}
            variant="contained"
            color="primary"
            size="large"
            disabled={!canAddCity}
          >
            Add city
    </Button>
        </Grid>
      </Grid>
      <Button onClick={onReset} size="large">
        Reset
    </Button>
    </>
  );
};

export default Controls;
