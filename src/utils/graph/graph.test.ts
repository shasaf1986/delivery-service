import Graph from './graph';
// TODO: add more tests
describe('Graph', () => {
  const calculator = new Graph();
  calculator.addEdge('A', 'B', 20);
  describe('getPath', () => {
    test('should return correct path data', () => {
      const vertices = ['A', 'B'];
      const path = calculator.getPath(vertices)!;
      expect(vertices.toString()).toBe(path.path.toString());
      expect(path.totalWeight).toBe(20);
    });
  });
});
