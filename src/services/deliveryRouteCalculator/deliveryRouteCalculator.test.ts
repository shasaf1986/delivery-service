import DeliveryRouteCalculator from "./deliveryRouteCalculator";

describe('DeliveryRouteCalculator', () => {
  const deliveryRouteCalculator = DeliveryRouteCalculator.fromRawRoutes(
    'AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1'.split(',')
  );
  test('should thrown an error when there are duplicate routes', () => {
    expect(() => {
      DeliveryRouteCalculator.fromRawRoutes(['AB1', 'AB2']);
    }).toThrow();
  });
  describe('getPossiblePaths', () => {
    test('should return correct number of paths', () => {
      const params = [{
        from: 'E',
        to: 'D',
        maxLength: 5,
        result: 4
      }, {
        from: 'E',
        to: 'E',
        maxLength: Infinity,
        result: 5
      }];
      params.forEach(({ from, to, maxLength, result }) => {
        const paths = deliveryRouteCalculator.getPossiblePaths(from, to, {
          maxLength
        });
        expect(paths.length).toBe(result);
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
        const actualCost = deliveryRouteCalculator.getDeliveryCost(route);
        console.log(actualCost);
        expect(actualCost).toBe(cost);
      });
    });
  });
});
