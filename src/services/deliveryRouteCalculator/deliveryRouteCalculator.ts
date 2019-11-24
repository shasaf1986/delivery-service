import Graph from '../../utils/graph';


export default class DeliveryRouteCalculator {
  private graph: Graph = new Graph();

  constructor(rawRoutes: string[]) {
    rawRoutes.forEach((rawRoute) => {
      const [from, to, ...rest] = rawRoute.split('');
      const weight = Number.parseFloat(rest.join(''));
      this.graph.addEdge(from, to, weight);
    });
  }
}
