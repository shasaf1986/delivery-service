import React, { useState, useMemo } from 'react';
import {
  Typography, Button, Select, Tabs, Tab, Box, createStyles, makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(
  createStyles({
    tabs: {
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    },
  }),
);

interface Props {
  tabs: string[];
  selectedTab: number;
  onChange: (value: number) => void;
  className?: string;
}
const VerticalTabs: React.FC<Props> = ({ tabs, selectedTab, onChange, className = '' }) => {
  const classes = useStyles();
  return (
    <Tabs
      className={`${classes.tabs} ${className}`}
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

export default VerticalTabs;
