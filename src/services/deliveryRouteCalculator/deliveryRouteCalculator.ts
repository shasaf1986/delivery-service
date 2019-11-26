import Graph from '../../utils/graph';


export default class DeliveryRouteCalculator {
  graph: Graph = new Graph();

  constructor(rawRoutes: string) {
    rawRoutes.split(',').forEach((rawRoute) => {
      const [from, to, ...rest] = rawRoute.trim().split('');
      const weight = Number.parseFloat(rest.join(''));
      this.graph.addEdge(from, to, weight);
    });
  }
}
