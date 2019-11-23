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
});
