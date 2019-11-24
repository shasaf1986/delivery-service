import PathData from "./types/pathData";

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
      maxLength = Infinity,
    }: {
      maxLength?: number,
    } = {}
  ) {
    const path: string[] = [];
    const paths: PathData[] = [];
    let totalWeight = 0;

    const getPossiblePathsRecursive = (from: string, to: string, weight: number) => {
      const node = this.graph.get(from);
      const isReachedMaxLength = (path.length + 2) > maxLength;
      if (!node || isReachedMaxLength) {
        return paths;
      }
      path.push(from);
      totalWeight = totalWeight + weight;
      node.forEach((weight, neighbor) => {
        if (neighbor === to) {
          const pathData: PathData = {
            path: [...path, to],
            totalWeight: totalWeight + weight,
          };
          paths.push(pathData);
        } else {
          const hasCircle = path.some((vertex, index) => {
            const nextVertex = path[index + 1];
            return vertex === from && nextVertex === neighbor;
          });
          if (!hasCircle) {
            getPossiblePathsRecursive(neighbor, to, weight);
          }
        }
      });
      totalWeight = totalWeight - weight;
      path.pop();
      return paths;
    };
    return getPossiblePathsRecursive(from, to, 0);
  }
  getShortestPath(from: string, to: string) {
    const paths = this.getPossiblePaths(from, to);
    if (paths.length === 0) {
      return null;
    }
    return paths.reduce((prevPath, currentPath) => {
      return currentPath.totalWeight < prevPath.totalWeight ? currentPath : prevPath;
    });
  }
}
