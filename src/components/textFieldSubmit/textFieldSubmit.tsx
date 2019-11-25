import React, { useState } from 'react';
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
  onSubmit: (value: string) => void;
}

const TextFieldSubmit: React.FC<Props> = ({
  submitText = 'Submit', initialValue = '',
  onSubmit,
}) => {
  const [value, setValue] = useState(initialValue);
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" flexGrow="flexGrow">
      <TextField
        fullWidth
        className={classes.input}
        onChange={(event) => { setValue(event.currentTarget.value); }}
        value={value}
        margin="none"
        variant="outlined"
      />
      <Box className={classes.button}>
        <Button onClick={() => {
          onSubmit(value);
        }} variant="contained" size="large" color="primary">
          {submitText}
        </Button>
      </Box>
    </Box>
  );
};

export default TextFieldSubmit;
