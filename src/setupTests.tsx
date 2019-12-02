import React from 'react';

jest.mock('@material-ui/core', () => {
  const actual = jest.requireActual('@material-ui/core');
  // eslint-disable-next-line react/jsx-props-no-spreading
  const SelectMock: React.FC<any> = ({ native, ...restProps }) => (<select {...restProps} />);
  return {
    ...actual,
    Select: SelectMock,
  };
});
