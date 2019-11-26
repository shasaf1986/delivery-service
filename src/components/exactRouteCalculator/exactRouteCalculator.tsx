import React, { useState } from 'react';
import { Typography, Button, Select } from '@material-ui/core';
import TextFieldSubmit from '../textFieldSubmit';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator/deliveryRouteCalculator';
import Stepper from '../stepper';
import InputGroup from '../inputGroup';

interface Props {
  calculator: DeliveryRouteCalculator;
}

const ExactRouteCalculator: React.FC<Props> = ({ calculator }) => {
  const [labels, setLables] = useState<string[]>(() => []);
  const [city, setCity] = useState('-1');
  const cities = [
    'A', 'B', 'C', 'E', 'F'
  ];
  return (
    <>
      <Typography gutterBottom variant="h5" component="h3">
        Case 1
      </Typography>
      <Stepper lables={labels} />
      <InputGroup>
        <Select
          native
          value={city}
          onChange={(event) => {
            // @ts-ignore
            setCity(event.currentTarget.value);
          }}
          variant="outlined"
        >
          <option value="-1">City</option>
          {
            cities.map((city) => <option key={city} value={city} >{city}</option>)
          }
        </Select>
        <Button
          onClick={() => {
            setCity('-1');
            setLables([
              ...labels,
              city
            ]);
          }}
          variant="contained"
          color="primary"
          size="large"
        >
          Add city
        </Button>
        <Button
          onClick={() => {
            setLables([]);
          }}
          variant="contained"
          size="large"
        >
          Reset
        </Button>
      </InputGroup>
    </>
  );
};

export default ExactRouteCalculator;
