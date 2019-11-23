export default class DeliveryRouteCalculator {
  static fromRawRoutes(rawRoutes: string[]) {
    const deliveryRouteCalculator = new DeliveryRouteCalculator();
    rawRoutes.forEach((rawRoute) => {
      const [from, to, ...rest] = rawRoute.split('');
      const weight = Number.parseFloat(rest.join(''));
      deliveryRouteCalculator.addEdge(from, to, weight);
    });
    return deliveryRouteCalculator;
  }
  adjacencyList: Map<string, Map<string, number>> = new Map();
  addEdge(from: string, to: string, weight: number) {
    console.info(`add edge from ${from} to ${to} weight ${weight}`);
    if (weight < 0) {
      throw new Error('weight should be >= 0');
    }
    let fromAdjacency = this.adjacencyList.get(from);
    if (!fromAdjacency) {
      fromAdjacency = new Map();
      this.adjacencyList.set(from, fromAdjacency);
    }
    if (fromAdjacency.has(to)) {
      throw new Error(`edge from ${from} to ${to} already exist`);
    }
    fromAdjacency.set(to, weight);
    if (!this.adjacencyList.has(to)) {
      this.adjacencyList.set(to, new Map());
    }
  }
}
