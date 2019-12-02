import DeliveryRouteCalculator from './deliveryRouteCalculator';

describe('DeliveryRouteCalculator', () => {
  const calculator = new DeliveryRouteCalculator('AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1');
  describe('getCities', () => {
    test('should return correct towns', () => {
      const cities = calculator.getCities();
      expect(cities.toString()).toBe(['A', 'B', 'C', 'D', 'E', 'F'].toString());
    });
  });
  describe('getPossibleDeliveryRoutes', () => {
    test.each<any>([
      ['E', 'D', 4, 4],
      ['E', 'E', Infinity, 5],
    ])('should return correct number of paths', (from: string, to: string, maxStops: number, expected: number) => {
      const count = calculator.getPossibleDeliveryRoutes(from, to, {
        maxStops,
      });
      expect(count).toBe(expected);
    });
  });
  describe('getDeliveryCost', () => {
    test.each<any>([
      [['A', 'B', 'E'], 4],
      [['A', 'D'], 10],
      [['E', 'A', 'C', 'F'], 8],
      [['A', 'D', 'F'], null],
    ])('should return correct cost for routes', (path: string[], expected: number | null) => {
      const actualCost = calculator.getDeliveryCost(path);
      expect(actualCost).toBe(expected);
    });
  });
  describe('getCheapestDeliveryRoute', () => {
    test.each<any>([
      ['E', 'D', 9],
      ['E', 'E', 6],
    ])('should return correct cost for routes', (from: string, to: string, expected: number) => {
      const cost = calculator.getCheapestDeliveryRoute(from, to)!;
      expect(cost).toBe(expected);
    });
  });
});
