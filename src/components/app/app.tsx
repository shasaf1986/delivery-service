import React from 'react';
import {
  CssBaseline, Container, createMuiTheme,
} from '@material-ui/core';
import { ThemeProvider, makeStyles, createStyles } from '@material-ui/styles';
import DeliveryService from '../deliveryService';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
    },
  },
});

const useStyles = makeStyles(
  createStyles({
    root: {
      paddingTop: '15px',
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className={classes.root}>
        <DeliveryService />
      </Container>
    </ThemeProvider>
  );
};

export default App;
