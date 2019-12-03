import DeliveryRouteCalculator from './deliveryRouteCalculator';

describe('DeliveryRouteCalculator', () => {
  const calculator = new DeliveryRouteCalculator('AB1,AC4,AD10,BE3,CD4,CF2,DE1,EB3,EA2,FD1,GA1');
  describe('getCities', () => {
    test('should return correct towns', () => {
      const cities = calculator.getCities();
      expect(cities).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    });
  });
  describe('getPossibleDeliveryRoutes', () => {
    test.each<any>([
      [4, 'E', 'D', 4],
      [5, 'E', 'E', Infinity],
    ])('should return %s when from is %s and to is %s and max stops are %s', (expected: number, from: string, to: string, maxStops: number) => {
      const count = calculator.getPossibleDeliveryRoutes(from, to, {
        maxStops,
      });
      expect(count).toBe(expected);
    });
  });
  describe('getDeliveryCost', () => {
    test.each<any>([
      [4, ['A', 'B', 'E']],
      [10, ['A', 'D']],
      [8, ['E', 'A', 'C', 'F']],
      [null, ['A', 'D', 'F']],
    ])('should return %s when the path is %j', (expected: number | null, path: string[]) => {
      const actualCost = calculator.getDeliveryCost(path);
      expect(actualCost).toBe(expected);
    });
  });
  describe('getCheapestDeliveryRoute', () => {
    test.each<any>([
      [9, 'E', 'D'],
      [6, 'E', 'E'],
      [null, 'A', 'G'],
    ])('should return %s when from is %s and to is %s', (expected: number, from: string, to: string) => {
      const cost = calculator.getCheapestDeliveryRoute(from, to);
      expect(cost).toBe(expected);
    });
  });
});
