export default class Graph {
  graph: Map<string, Map<string, number>> = new Map();
  addEdge(from: string, to: string, weight: number) {
    if (weight < 0) {
      throw new Error('weight should be >= 0');
    }
    let fromAdjacency = this.graph.get(from);
    if (!fromAdjacency) {
      fromAdjacency = new Map();
      this.graph.set(from, fromAdjacency);
    }
    if (fromAdjacency.has(to)) {
      throw new Error(`edge from ${from} to ${to} already exist`);
    }
    fromAdjacency.set(to, weight);
    if (!this.graph.has(to)) {
      this.graph.set(to, new Map());
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
      const adjacency = this.graph.get(fromTown);
      if (!adjacency || !adjacency.has(toTown)) {
        return null;
      }

      cost += adjacency.get(toTown)!;
    }
    return cost;

  }
  getPossiblePaths(
    from: string, to: string,
    {
      path = [],
      paths = [],
      maxLength = Infinity,
    }: {
      path?: string[],
      paths?: string[][],
      maxLength?: number
    } = {}
  ) {
    const node = this.graph.get(from);
    const isReachedMaxLength = (path.length + 2) > maxLength;
    if (!node || isReachedMaxLength) {
      return paths;
    }
    path.push(from);
    node.forEach((weight, neighbor) => {
      if (neighbor === to) {
        const validPath = [
          ...path,
          to,
        ];
        paths.push(validPath);
      } else {
        const hasCircle = path.some((vertex, index) => {
          const nextVertex = path[index + 1];
          return vertex === from && nextVertex === neighbor;
        });
        if (!hasCircle) {
          this.getPossiblePaths(neighbor, to, {
            path, paths, maxLength
          });
        }
      }
    });
    path.pop();
    return paths;
  }
}
