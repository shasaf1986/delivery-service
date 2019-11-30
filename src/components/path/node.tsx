import React from 'react';
import {
  Step as OriginStep, StepLabel, makeStyles, createStyles, Grow,
} from '@material-ui/core';

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

interface Props {
  disabled: boolean;
  label: string;
  showAnimation?: boolean;
}

const Node: React.FC<Props> = ({ disabled, label, showAnimation = true }) => {
  const classes = useStyles(disabled);
  const step = (
    <OriginStep className={classes.step}>
      <StepLabel><div className={classes.label}>{label}</div></StepLabel>
    </OriginStep>
  );
  if (showAnimation) {
    return (
      <Grow in timeout={500}>
        {step}
      </Grow>
    );
  }
  return step;
};

export default Node;
