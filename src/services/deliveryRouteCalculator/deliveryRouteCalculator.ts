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
  getDeliveryCost(deliveryRoute: string[]) {
    if (deliveryRoute.length < 2) {
      throw new Error('deliveryRoute should >= 2');
    }
    let cost = 0;
    for (let i = 0; i < deliveryRoute.length - 1; i++) {
      const fromTown = deliveryRoute[i];
      const toTown = deliveryRoute[i + 1];
      const adjacency = this.adjacencyList.get(fromTown);
      if (!adjacency || !adjacency.has(toTown)) {
        return null;
      }
      cost += adjacency.get(toTown)!;
    }
    return cost;
  }
}
