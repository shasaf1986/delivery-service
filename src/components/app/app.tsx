import React from 'react';
import {
  CssBaseline, Container, createMuiTheme,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
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
