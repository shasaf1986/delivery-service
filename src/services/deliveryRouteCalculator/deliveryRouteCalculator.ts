import Graph from '../../utils/graph/graph';

export default class DeliveryRouteCalculator {
  private graph: Graph = new Graph();

  constructor(rawGraph: string) {
    rawGraph.split(',').forEach((rawRoute) => {
      const [from, to, ...rest] = rawRoute.trim().split('');
      const weight = Number.parseFloat(rest.join(''));
      this.graph.addEdge(from, to, weight);
    });
  }

  getDeliveryCost(route: string[]) {
    const path = this.graph.getPathData(route);
    return path ? path.totalWeight : null;
  }


  getPossibleDeliveryRoutes(
    from: string, to: string,
    {
      maxStops = Infinity,
    }: {
      maxStops?: number,
    } = {},
  ) {
    const paths = this.graph.getPossiblePaths(from, to, { maxLength: maxStops + 1 });
    return paths.length;
  }

  getCheapestDeliveryRoute(from: string, to: string) {
    const path = this.graph.getShortestPath(from, to);
    return path ? path.totalWeight : null;
  }

  getTowns() {
    return this.graph.getVertices();
  }
}
