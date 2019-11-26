import React, { useState } from 'react';
import {
  Box,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(
  createStyles({
    root: {
      '& button': {
        whiteSpace: 'nowrap',
      },
      '& input, & select': {
        paddingTop: '12px',
        paddingBottom: '12px',
      },
      '& >*:not(:first-child)': {
        marginLeft: '10px',
      }
    },
  }),
);

interface Props { };

const InputGroup: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <Box display="flex" className={classes.root} alignItems="center" flexGrow="flexGrow">
      {children}
    </Box>
  );
};

export default InputGroup;
