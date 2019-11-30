import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Path from './path';

describe('Path', () => {
  test('should render correct path', () => {
    for (let i = 0; i < 3; i += 1) {
      cleanup();
      const path = [];
      for (let j = 0; j < i; j += 1) {
        path.push(`NODE_${j}`);
      }
      const { queryAllByText } = render(<Path path={path} />);
      // should render paths if path.length > 0
      expect(queryAllByText(/NODE/i).length).toBe(i);
      // should render placeholder paths if path.length < 2
      expect(queryAllByText('?').length).toBe(i < 2 ? 2 - i : 0);
    }
  });
});
