import React from 'react';
import {
  render, fireEvent, RenderResult,
} from '@testing-library/react';
import RouteCalculator from './routeCalculator';
import DeliveryRouteCalculator from '../../services/deliveryRouteCalculator';

jest.mock('../verticalTabs', () => ({
  onChange,
}: { onChange: (newTab: number) => void }) => (
  <>
    {
        Array.from({ length: 3 }, (_, index) => (
          <button
            data-testid={`tab-${index}`}
            key={index.toString()}
            type="button"
            onClick={() => {
              onChange(index);
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
function changeTab(renderResult: RenderResult, tab: number) {
  const { getByTestId } = renderResult;
  fireEvent.click(getByTestId(`tab-${tab}`));
}

describe('RouteCalculator', () => {
  const calculator = new DeliveryRouteCalculator('AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1,GA1');
  afterEach(() => {
    jest.clearAllMocks();
  });
  test.each<any>([
    [['A', 'B', 'E'], 4],
    [['B', 'A'], null],
  ])('should show correct result message for case 1', (path: string[], expected: number | null) => {
    const spy = jest.spyOn(calculator, 'getDeliveryCost');
    const renderResult = render(<RouteCalculator calculator={calculator} />);
    const { getByTestId } = renderResult;
    setPath(renderResult, path);
    const result = getByTestId('result-message').innerHTML;
    expect(spy).toHaveBeenLastCalledWith(path);
    expect(result).toBe(expected !== null ? `The cost is ${expected}` : 'No such route');
  });
  test.each<any>([
    [['E', 'D'], 9],
    [['A', 'G'], null],
  ])('should show correct result message for case 3', (path: string[], expected: number | null) => {
    const [from, to] = path;
    const spy = jest.spyOn(calculator, 'getCheapestDeliveryRoute');
    const renderResult = render(<RouteCalculator calculator={calculator} />);
    const { getByTestId } = renderResult;
    changeTab(renderResult, 2);
    setPath(renderResult, path);
    expect(spy).toHaveBeenLastCalledWith(from, to);
    const result = getByTestId('result-message').innerHTML;
    expect(result).toBe(expected !== null ? `The cost for the cheapest delivery route is ${expected}` : 'No such route');
  });
});
