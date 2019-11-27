import { PathData } from './types';


export default class DeliveryRouteCalculator {
  _graph: Map<string, Map<string, number>> = new Map();

  static fromRawGraph(rawGraph: string) {
    const deliveryRouteCalculator = new DeliveryRouteCalculator();
    rawGraph.split(',').forEach((rawRoute) => {
      const [from, to, ...rest] = rawRoute.trim().split('');
      const weight = Number.parseFloat(rest.join(''));
      deliveryRouteCalculator.addEdge(from, to, weight);
    });
    return deliveryRouteCalculator;
  }

  addEdge(from: string, to: string, weight: number) {
    if (typeof weight !== 'number' || Number.isNaN(weight) || weight < 0) {
      throw new Error('weight should be >= 0');
    }
    let fromAdjacency = this._graph.get(from);
    if (!fromAdjacency) {
      fromAdjacency = new Map();
      this._graph.set(from, fromAdjacency);
    }
    if (fromAdjacency.has(to)) {
      throw new Error(`edge from ${from} to ${to} already exist`);
    }
    fromAdjacency.set(to, weight);
    if (!this._graph.has(to)) {
      this._graph.set(to, new Map());
    }
  }
  getVertices() {
    const vertices: string[] = [];
    this._graph.forEach((_, vertex) => {
      vertices.push(vertex);
    });
    return vertices;
  }
  getDeliveryCost(deliveryRoute: string[]) {
    if (deliveryRoute.length < 2) {
      throw new Error('deliveryRoute should >= 2');
    }
    let cost = 0;
    for (let i = 0; i < deliveryRoute.length - 1; i += 1) {
      const fromTown = deliveryRoute[i];
      const toTown = deliveryRoute[i + 1];
      const adjacency = this._graph.get(fromTown);
      if (!adjacency || !adjacency.has(toTown)) {
        return null;
      }

      cost += adjacency.get(toTown)!;
    }
    return cost;
  }

  _getPossiblePaths(
    from: string, to: string,
    {
      maxLength = Infinity,
    }: {
      maxLength?: number,
    } = {},
  ) {
    const path: string[] = [];
    const paths: PathData[] = [];
    let totalWeight = 0;

    const getPossiblePathsRecursive = (from: string, to: string, weight: number) => {
      const node = this._graph.get(from);
      const isReachedMaxLength = (path.length + 2) > maxLength;
      if (!node || isReachedMaxLength) {
        return paths;
      }
      path.push(from);
      totalWeight += weight;
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
      totalWeight -= weight;
      path.pop();
      return paths;
    };
    return getPossiblePathsRecursive(from, to, 0);
  }

  getPossiblePathsCount(
    from: string, to: string,
    {
      maxStops = Infinity,
    }: {
      maxStops?: number,
    } = {},
  ) {
    return this._getPossiblePaths(from, to, { maxLength: maxStops + 1 }).length;
  }

  getShortestPathLength(from: string, to: string) {
    const path = this._getShortestPath(from, to);
    return path ? path.totalWeight : null;
  }
  // TODO : implement it with diextra for better performance
  _getShortestPath(from: string, to: string) {
    const paths = this._getPossiblePaths(from, to);
    if (paths.length === 0) {
      return null;
    }
    return paths.reduce((prevPath, currentPath) => (currentPath.totalWeight < prevPath.totalWeight
      ? currentPath : prevPath));
  }
}
