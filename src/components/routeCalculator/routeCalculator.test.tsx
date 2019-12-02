import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import RouteCalculator from './routeCalculator';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator';

jest.mock('../verticalTabs', () => ({
  onChage,
}: { onChage: (newTab: number) => void }) => (
  <>
    {
        Array.from({ length: 3 }, (_, index) => (
          <button
            data-testid={`tab-${index}`}
            key={index.toString()}
            type="button"
            onClick={() => {
              onChage(index);
            }}
          />
        ))
      }
  </>
));

function setPath(renderResult: RenderResult, path: string[]) {
  const { getByTestId } = renderResult;
  path.forEach((node) => {
    fireEvent.change(getByTestId('cities'), { target: { value: node } });
    fireEvent.click(getByTestId('add-city'));
  });
}


describe('RouteCalculator', () => {
  const calculator = new DeliveryRouteCalculator('AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1');
  test.each<any>([
    [['A', 'B', 'E'], 4],
    [['B', 'A'], null],
  ])('should show correct result message with specific path case 1', (path: string[], expectedCost: number | null) => {
    const renderResult = render(<RouteCalculator calculator={calculator} />);
    const { getByTestId } = renderResult;
    setPath(renderResult, path);
    const result = getByTestId('result-message').innerHTML;
    expect(result).toBe(expectedCost !== null ? `The cost is ${expectedCost}` : 'No such route');
  });
});
