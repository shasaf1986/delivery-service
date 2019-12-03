import React from 'react';
import { render } from '@testing-library/react';
import Path from './path';

describe('Path', () => {
  test.each([0, 1, 2])('should render correct path when there are %s nodes', (numberOfNodes) => {
    const path = Array.from({ length: numberOfNodes }, (_, index) => `NODE_${index}`);
    const { queryAllByText } = render(<Path path={path} />);
    // should render paths if path.length > 0
    expect(queryAllByText(/NODE/i).length).toBe(numberOfNodes);
    // should render placeholder paths if path.length < 2
    expect(queryAllByText('?').length).toBe(numberOfNodes < 2 ? 2 - numberOfNodes : 0);
  });
});
