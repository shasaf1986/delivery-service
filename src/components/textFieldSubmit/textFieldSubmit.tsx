import React, { useState } from 'react';
import {
  Typography, CssBaseline, Container, TextField, Paper, Button, createMuiTheme, Box, NativeSelect, FormControl, Select,
} from '@material-ui/core';
import { ThemeProvider, createStyles, makeStyles } from '@material-ui/styles';
import InputGroup from '../inputGroup';


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

  return (
    <InputGroup>
      <Select
        native
        fullWidth
        variant="outlined"
        inputProps={{
          name: 'age',
          id: 'outlined-age-native-simple',
        }}
      >
        <option value="" />
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
      <Button
        onClick={() => {
          onSubmit(value);
        }}
        variant="contained"
        size="large"
        color="primary"
      >
        {submitText}
      </Button>
    </InputGroup>
  );
};

export default TextFieldSubmit;
