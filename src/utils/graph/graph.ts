import { PathData } from './types';

export default class Graph {
  private adjacencyList: Map<string, Map<string, number>> = new Map();

  addEdge(from: string, to: string, weight: number) {
    if (typeof weight !== 'number' || Number.isNaN(weight) || weight < 0) {
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

  getVertices() {
    const vertices: string[] = [];
    this.adjacencyList.forEach((_, vertex) => {
      vertices.push(vertex);
    });
    return vertices;
  }

  getPath(vertices: string[]) {
    const pathData: PathData = {
      path: [],
      totalWeight: 0,
    };
    for (let i = 0; i < vertices.length - 1; i += 1) {
      const from = vertices[i];
      const to = vertices[i + 1];
      const adjacency = this.adjacencyList.get(from);
      if (!adjacency || !adjacency.has(to)) {
        return null;
      }
      pathData.totalWeight += adjacency.get(to)!;
    }
    pathData.path = [...vertices];
    return pathData;
  }

  getPossiblePaths(
    from: string, to: string,
    {
      maxLength = Infinity,
    }: {
      maxLength?: number,
    } = {},
  ) {
    const tempPath: PathData = {
      path: [],
      totalWeight: 0,
    };
    const paths: PathData[] = [];
    // eslint-disable-next-line no-shadow
    const getPossiblePathsRecursive = (from: string, to: string, weight: number) => {
      const adjacency = this.adjacencyList.get(from);
      const isReachedMaxLength = (tempPath.path.length + 2) > maxLength;
      if (!adjacency || isReachedMaxLength) {
        return paths;
      }
      tempPath.path.push(from);
      tempPath.totalWeight += weight;
      adjacency.forEach((weightToNeighbor, neighbor) => {
        if (neighbor === to) {
          const pathData: PathData = {
            path: [...tempPath.path, to],
            totalWeight: tempPath.totalWeight + weightToNeighbor,
          };
          paths.push(pathData);
        } else {
          const hasCircle = tempPath.path.some((vertex, index) => {
            const nextVertex = tempPath.path[index + 1];
            return vertex === from && nextVertex === neighbor;
          });
          if (!hasCircle) {
            getPossiblePathsRecursive(neighbor, to, weightToNeighbor);
          }
        }
      });
      tempPath.totalWeight -= weight;
      tempPath.path.pop();
      return paths;
    };
    return getPossiblePathsRecursive(from, to, 0);
  }

  // TODO : implement it with diextra for better performance
  getShortestPath(from: string, to: string) {
    const paths = this.getPossiblePaths(from, to);
    if (paths.length === 0) {
      return null;
    }
    return paths.reduce((prevPath, currentPath) => (currentPath.totalWeight < prevPath.totalWeight
      ? currentPath : prevPath));
  }
}
