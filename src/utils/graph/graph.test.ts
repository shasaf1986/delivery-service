import Graph from "./graph";

describe('Graph', () => {
  const edges = [
    {
      from: 'A', to: 'B', weight: 1
    },
    {
      from: 'A', to: 'C', weight: 4
    },
    {
      from: 'A', to: 'D', weight: 10
    },
    {
      from: 'B', to: 'E', weight: 3
    },
    {
      from: 'C', to: 'D', weight: 4
    },
    {
      from: 'C', to: 'F', weight: 2
    },
    {
      from: 'D', to: 'E', weight: 1
    },
    {
      from: 'E', to: 'B', weight: 3
    },
    {
      from: 'E', to: 'A', weight: 2
    },
    {
      from: 'F', to: 'D', weight: 1
    },
  ];
  const graph = new Graph();
  edges.forEach(({ from, to, weight }) => {
    graph.addEdge(from, to, weight);
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
        const paths = graph.getPossiblePaths(from, to, {
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
        const actualCost = graph.getDeliveryCost(route);
        console.log(actualCost);
        expect(actualCost).toBe(cost);
      });
    });
  });
});
