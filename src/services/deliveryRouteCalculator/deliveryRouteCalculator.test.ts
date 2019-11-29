import DeliveryRouteCalculator from './deliveryRouteCalculator';

describe('DeliveryRouteCalculator', () => {
  const calculator = new DeliveryRouteCalculator('AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1');
  describe('getPossibleDeliveryRoutes', () => {
    test('should return correct towns', () => {
      const towns = calculator.getTowns();
      expect(towns.toString()).toBe(['A', 'B', 'C', 'D', 'E', 'F'].toString());
    });
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
        const count = calculator.getPossibleDeliveryRoutes(from, to, {
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
  describe('getCheapestDeliveryRoute', () => {
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
        const length = calculator.getCheapestDeliveryRoute(from, to)!;
        expect(length).toBe(totalWeight);
      });
    });
  });
});
