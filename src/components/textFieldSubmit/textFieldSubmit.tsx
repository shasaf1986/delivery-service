import React from 'react';
import { Typography, CssBaseline, Container, TextField, Paper, Button, createMuiTheme, Box } from '@material-ui/core';
import { ThemeProvider, createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(
  createStyles({
    input: {
      '& input': {
        paddingTop: '12px',
        paddingBottom: '12px',
      }
    },
    button: {
      marginLeft: '10px'
    }
  }),
);

interface Props {
  submitText?: string;
  initialValue?: string;
}

const TextFieldSubmit: React.FC<Props> = ({ submitText = 'Submit', initialValue = '' }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" flexGrow="flexGrow">
      <TextField
        fullWidth
        className={classes.input}
        defaultValue="AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1"
        margin="none"
        variant="outlined"
      />
      <Box className={classes.button}>
        <Button variant="contained" size="large" color="primary">
          {submitText}
        </Button>
      </Box>
    </Box>
  );
};

export default TextFieldSubmit;
