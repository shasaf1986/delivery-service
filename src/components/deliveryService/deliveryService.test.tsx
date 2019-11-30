import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeliveryService from './deliveryService';

jest.mock('../setGraph', () => ({
  onSubmit,
}: { onSubmit: (value: string) => void }) => (
  <button
    data-testid="submit-graph"
    type="button"
    onClick={() => {
      onSubmit('AB1');
    }}
  />
));
jest.mock('../routeCalculator', () => () => (
  <div data-testid="route-calculator" />
));

describe('DeliveryService', () => {
  test('should render RouteCalculator once graph is ready', () => {
    const { getByTestId, queryByTestId } = render(<DeliveryService />);
    expect(queryByTestId('route-calculator')).toBeNull();
    fireEvent.click(getByTestId('submit-graph'));
    expect(queryByTestId('submit-graph')).toBeNull();
    expect(queryByTestId('route-calculator')).not.toBeNull();
  });
});
