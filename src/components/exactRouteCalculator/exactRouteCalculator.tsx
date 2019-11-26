import React, { useState, useMemo } from 'react';
import { Typography, Button, Select, Tabs, Tab, Box, createStyles, makeStyles } from '@material-ui/core';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator/deliveryRouteCalculator';
import Stepper from '../stepper';
import InputGroup from '../inputGroup';

interface Props {
  calculator: DeliveryRouteCalculator;
}

const useStyles = makeStyles(
  createStyles({
    bar: {
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      marginRight: '15px',
      marginTop: '-16px',
      marginBottom: '-16px',
      marginLeft: '-16px'
    }
  }),
);

const tabs = ['Case 1', 'Case 2', 'Case 3'];
const ExactRouteCalculator: React.FC<Props> = ({ calculator }) => {
  const classes = useStyles();
  const [labels, setLables] = useState<string[]>(() => []);
  const [city, setCity] = useState('-1');
  const [selectedTab, setSelectedTab] = useState(0);

  const cities = useMemo(() => {
    const citiesFromGraph: string[] = [];
    calculator.graph.graph.forEach((_, city) => {
      citiesFromGraph.push(city);
    });
    return citiesFromGraph;
  }, []);

  const canAddCity = city !== '-1';
  const addCity = () => {
    setCity('-1');
    setLables([
      ...labels,
      city,
    ]);
  };
  const rest = () => {
    setCity('-1');
    setLables([]);
  };
  return (
    <Box marginRight={"10px"} display="flex">
      <Tabs
        className={classes.bar}
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        onChange={(event, newValue) => {
          setSelectedTab(newValue);
        }}
      >
        {
          tabs.map((tab) =>
            <Tab key={tab} label={tab} />
          )
        }
      </Tabs>
      <Box flex="1">
        <Typography gutterBottom variant="h5" component="h3">
          {tabs[selectedTab]}
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
          <Button
            onClick={rest}
            // variant="contained"
            size="large"
          >
            Reset
        </Button>
        </InputGroup>
      </Box>

    </Box>
  );
};

export default ExactRouteCalculator;
