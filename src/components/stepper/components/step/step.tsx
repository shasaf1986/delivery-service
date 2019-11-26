import React from 'react';
import {
  Step as OriginStep, StepLabel, makeStyles, createStyles, Fade, Grow,
} from '@material-ui/core';

interface Props {
  disabled: boolean;
  label: string;
}

const useStyles = makeStyles<undefined, boolean>(
  createStyles({
    step: {
      '& .MuiStepLabel-iconContainer': {
        display: 'none',
      },
    },
    label: (disabled: boolean) => ({
      width: '24px',
      height: '24px',
      backgroundColor: disabled ? 'rgba(0, 0, 0, 0.38)' : '#3f51b5',
      borderRadius: '50%',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '24px',
    }),
  }),
);

const Step: React.FC<Props> = ({ disabled, label }) => {
  const classes = useStyles(disabled);
  return (

    <Grow in timeout={500}>
      <OriginStep className={classes.step}>
        <StepLabel><div className={classes.label}>{label}</div></StepLabel>
      </OriginStep>
    </Grow>
  );
};

export default Step;
