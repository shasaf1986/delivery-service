import DeliveryRouteCalculator from "./deliveryRouteCalculator";

describe('DeliveryRouteCalculator', () => {
  const deliveryRouteCalculator = DeliveryRouteCalculator.fromRawRoutes(
    'AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1'.split(',')
  );
  // const deliveryRouteCalculator = DeliveryRouteCalculator.fromRawRoutes(
    // 'EB1,BE1,ED1'.split(',')
  // );
  test.skip('should thrown an error when there are duplicate routes', () => {
    expect(() => {
      DeliveryRouteCalculator.fromRawRoutes(['AB1', 'AB2']);
    }).toThrow();
  });
  test('dummy', () => {
    const test = deliveryRouteCalculator.getNumberOfDeliveryRoutes('E', 'D');
    console.log(test);
  });
  describe.skip('getDeliveryCost', () => {
    test('should return correct cost for routes', () => {
      const routesAndCosts = [
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
      routesAndCosts.forEach(({ route, cost }) => {
        const actualCost = deliveryRouteCalculator.getDeliveryCost(route);
        console.log(actualCost);
        expect(actualCost).toBe(cost);
      });
    });
  });
});
