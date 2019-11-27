import DeliveryRouteCalculator from './deliveryRouteCalculator';

describe('DeliveryRouteCalculator', () => {
  const calculator = DeliveryRouteCalculator.fromRawGraph('AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1');
  describe('getPossiblePaths', () => {
    test('should return correct number of paths', () => {
      const params = [{
        from: 'E',
        to: 'D',
        maxStops: 4,
        result: 4,
      }, {
        from: 'E',
        to: 'E',
        maxStops: Infinity,
        result: 5,
      }];
      params.forEach(({
        from, to, maxStops, result,
      }) => {
        const count = calculator.getPossiblePathsCount(from, to, {
          maxStops,
        });
        expect(count).toBe(result);
      });
    });
  });
  describe('getDeliveryCost', () => {
    test('should return correct cost for routes', () => {
      const params = [
        {
          route: ['A', 'B', 'E'],
          cost: 4,
        },
        {
          route: ['A', 'D'],
          cost: 10,
        },
        {
          route: ['E', 'A', 'C', 'F'],
          cost: 8,
        },
        {
          route: ['A', 'D', 'F'],
          cost: null,
        },
      ];
      params.forEach(({ route, cost }) => {
        const actualCost = calculator.getDeliveryCost(route);
        expect(actualCost).toBe(cost);
      });
    });
  });
  describe('getShortestPathLength', () => {
    test('should return correct cost for routes', () => {
      const params = [
        {
          from: 'E',
          to: 'D',
          totalWeight: 9,
        },
        {

          from: 'E',
          to: 'E',
          totalWeight: 6,
        },
      ];
      params.forEach(({ from, to, totalWeight }) => {
        const length = calculator.getShortestPathLength(from, to)!;
        expect(length).toBe(totalWeight);
      });
    });
  });
});
