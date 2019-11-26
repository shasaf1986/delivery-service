import React, { useState, useMemo } from 'react';
import {
  Typography, Button, Select, Tabs, Tab, Box, createStyles, makeStyles,
} from '@material-ui/core';

interface Props {
  cities: string[];
  selectedCity: string;
  canAddCity: boolean;
  addCity: () => void;
  onReset: () => void;
  onCityChange: (city: string) => void;
}

const Controls: React.FC<Props> = ({
  cities, selectedCity, onReset, canAddCity,
  addCity, onCityChange
}) => {

  return (
    <>
      <InputGroup>
        <Select
          native
          value={selectedCity}
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
        <Button
          onClick={addCity}
          variant="contained"
          color="primary"
          size="large"
          disabled={!canAddCity}
        >
          Add city
          </Button>
        <Button onClick={onReset} size="large" >
          Reset
          </Button>
      </InputGroup>
    </>
  );
};

export default Controls;
