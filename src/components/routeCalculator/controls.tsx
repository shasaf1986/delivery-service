import React from 'react';
import {
  Button, Select, createStyles, makeStyles, Grid,
} from '@material-ui/core';

const useStyles = makeStyles(
  createStyles({
    select: {
      width: '80px',
    },
  }),
);

const stops: number[] = [];
for (let i = 0; i < 20; i += 1) {
  stops.push(i + 1);
}
interface Props {
  cities: string[];
  selectedCity: string;
  canAddCity: boolean;
  selectedMaxStops: number;
  addCity: () => void;
  onReset: () => void;
  onCityChange: (value: string) => void;
  onMaxStopsChange: (value: number) => void;
  showMaxStops: boolean;
}

const Controls: React.FC<Props> = ({
  cities, selectedCity, onReset, canAddCity,
  addCity, onCityChange, selectedMaxStops, onMaxStopsChange,
  showMaxStops,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid alignItems="center" spacing={1} container>
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
            <option value={0} />
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
        {showMaxStops && (
          <>
            <Grid item>
              MAX STOPS
            </Grid>
            <Grid item>
              <Select
                className={classes.select}
                native
                value={selectedMaxStops}
                margin="dense"
                onChange={(event) => {
                  // @ts-ignore
                  onMaxStopsChange(Number.parseInt(event.currentTarget.value));
                }}
                variant="outlined"
              >
                <option value={-1}>∞</option>
                {
                  stops.map((stop) => <option key={stop} value={stop}>{stop}</option>)
                }
              </Select>
            </Grid>
          </>
        )}
        <Grid item>
          <Button onClick={onReset} size="large">
            Reset
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Controls;
