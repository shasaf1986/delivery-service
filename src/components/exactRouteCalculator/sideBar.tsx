import React, { useState, useMemo } from 'react';
import {
  Typography, Button, Select, Tabs, Tab, Box, createStyles, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(
  createStyles({
    bar: {
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      marginRight: '15px',
      marginTop: '-16px',
      marginBottom: '-16px',
      marginLeft: '-16px',
    },
  }),
);

interface Props {
  tabs: string[];
  selectedTab: number;
  onChange: (value: number) => void;
}
const SideBar: React.FC<Props> = ({ tabs, selectedTab, onChange }) => {
  const classes = useStyles();
  return (
    <Tabs
      className={classes.bar}
      orientation="vertical"
      variant="scrollable"
      value={selectedTab}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
    >
      {
        tabs.map((tab) => <Tab key={tab} label={tab} />)
      }
    </Tabs>
  );
};

export default SideBar;
