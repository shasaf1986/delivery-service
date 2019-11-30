import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import VerticalTabs from './verticalTabs';

describe('verticalTabs', () => {
  test('should call onChange with correct new tab after click another tab', () => {
    const onChange = jest.fn<void, number[]>();
    const { getByText } = render(
      <VerticalTabs
        tabs={[
          'TAB1',
          'TAB2',
        ]}
        selectedTab={0}
        onChange={onChange}
      />,
    );
    fireEvent.click(getByText('TAB2'));
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
