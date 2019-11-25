import React from 'react';
import {
  Typography, CssBaseline, Container, TextField, Paper, Button, createMuiTheme, Box,
} from '@material-ui/core';
import { ThemeProvider, createStyles, makeStyles } from '@material-ui/styles';
import TextFieldSubmit from '../textFieldSubmit';
import DeliveryService from '../deliveryService';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
    },
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container>
      <DeliveryService />
    </Container>
  </ThemeProvider>
);

export default App;
