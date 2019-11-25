import React from 'react';
import { Typography, CssBaseline, Container, TextField, Paper, Button, createMuiTheme, Box } from '@material-ui/core';
import { ThemeProvider, createStyles, makeStyles } from '@material-ui/styles';
import TextFieldSubmit from '../textFieldSubmit';

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#fff"
    }
  }
});

const useStyles = makeStyles(
  createStyles({
    input: {
      '& input': {
        paddingTop: '12px',
        paddingBottom: '12px',
      }
      // '> di'
      // display: 'block',
      // width: '100%',
    },
    paper: {

      padding: '24px 16px'
    },
    button: {
      marginLeft: '10px'
    }
  }),
);


const App: React.FC = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Container>
        <Typography component="div" >
          <Typography variant="h3" gutterBottom>
            Delivery Service
      </Typography>
          <Paper className={classes.paper} >
            <Typography gutterBottom variant="h5" component="h3">
              Enter graph
      </Typography>
            <TextFieldSubmit
              onSubmit={(value) => {
                console.log(value);
              }}
              initialValue="AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1"
            />
          </Paper>
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default App;
