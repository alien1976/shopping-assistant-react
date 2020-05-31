const GENERATED_POINTS_COEF = 10;
let maxProgress = 0;
let currentProgress = 0;

class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 1; i <= this.collection.length; i++) {
                if (element[1] < this.collection[i - 1][1]) {
                    this.collection.splice(i - 1, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    }

    dequeue() {
        let value = this.collection.shift();
        return value;
    }

    isEmpty() {
        return (this.collection.length === 0)
    }
}

const getWeight = (point1, point2) => {
    const [x1, y1] = point1.split(',');
    const [x2, y2] = point2.split(',');

    return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))
}

const findEdjeIndex = (edjesArray, pointCoords) => {
    for (let i = 0; i < edjesArray.length; i++) {
        if (edjesArray[i].coord === pointCoords) {
            return i;
        }
    }
    return -1;
}

const removeEdje = (prevMap, point1, point2) => {
    const mapValue1 = prevMap[point1];
    if (!mapValue1 || !mapValue1.length) return;

    const edje1Index = findEdjeIndex(mapValue1, point2);
    if (edje1Index === -1) return;

    prevMap[point1].slice(edje1Index, 0)
}

const addPointBetweenOtherTwo = (map, point1, point2, newPoint) => {
    const newMap = { ...map }
    removeEdje(newMap, point1, point2);
    removeEdje(newMap, point2, point1);
    newMap[newPoint] = [{ coord: point1, weight: getWeight(point1, newPoint) }, { coord: point2, weight: getWeight(point2, newPoint) }];
    newMap[point1].push({ coord: newPoint, weight: getWeight(point1, newPoint) });
    newMap[point2].push({ coord: newPoint, weight: getWeight(newPoint, point2) });
    return newMap;
}

const generateMidPoints = (pathGraph, point1, point2, pointsCnt) => {
    if (pointsCnt <= 1) return pathGraph;
    const [x1, y1] = point1.split(',');
    const [x2, y2] = point2.split(',');
    const mid = (parseInt(x1) + parseInt(x2)) / 2 + ',' + (parseInt(y1) + parseInt(y2)) / 2;
    pathGraph = addPointBetweenOtherTwo(pathGraph, point1, point2, mid);
    return {
        ...generateMidPoints(pathGraph, point1, mid, pointsCnt / 2),
        ...generateMidPoints(pathGraph, mid, point2, pointsCnt / 2)
    }
}

const generateLinesPathPoints = (adjList, points) => {
    let pathGraph = { ...adjList };
    const looped = [];

    for (let point of points) {
        adjList[point].forEach((neighbour) => {
            if (looped.indexOf(neighbour.coord) !== -1) return;
            const pointsCnt = Math.round(neighbour.weight / GENERATED_POINTS_COEF);
            pathGraph = generateMidPoints(pathGraph, point, neighbour.coord, pointsCnt);
            looped.push(point);
            currentProgress++
            // postMessage({ finish: false, currentProgress: (currentProgress / maxProgress) * 100 })
        })
        currentProgress++
        // postMessage({ finish: false, currentProgress: (currentProgress / maxProgress) * 100 })
    }

    return pathGraph;
}

const findPathWithDijkstra = (graph, startNode, endNode, prevPath = []) => {
    let times = {};
    let backtrace = {};
    let pq = new PriorityQueue();
    times[startNode] = 0;

    Object.keys(graph).forEach(node => {
        if (node !== startNode) {
            times[node] = Infinity
        }
    });

    pq.enqueue([startNode, 0]);

    while (!pq.isEmpty()) {
        let shortestStep = pq.dequeue();
        let currentNode = shortestStep[0];

        graph[currentNode].forEach(neighbour => {
            let time = times[currentNode] + neighbour.weight;
            if (time < times[neighbour.coord]) {
                times[neighbour.coord] = time;
                backtrace[neighbour.coord] = currentNode;
                pq.enqueue([neighbour.coord, time]);
            }
        });
    }

    let path = [endNode];
    let lastStep = endNode;
    while (lastStep !== startNode) {
        if (lastStep === undefined) return [...prevPath, ...path]
        path.unshift(backtrace[lastStep])
        lastStep = backtrace[lastStep]
    }

    return [[...prevPath, ...path], times[endNode]];
}

const findShortestPath = (graph, startPoint, products, path = []) => {
    const unvisited = [...products];
    if (!unvisited.length) return path;
    let [shortestPath, minimalLength, currentPoint] = [[], Infinity, startPoint];
    for (let i = 0; i < unvisited.length; i++) {
        const [currentShortestPath, pathLength] = findPathWithDijkstra(graph, startPoint, unvisited[i]);

        if (minimalLength > pathLength) {
            shortestPath = currentShortestPath;
            minimalLength = pathLength;
            currentPoint = unvisited[i];
        }
        currentProgress++
    }
    // postMessage({ finish: false, currentProgress: (currentProgress / maxProgress) * 100 })
    unvisited.splice(unvisited.indexOf(currentPoint), 1)
    return findShortestPath(graph, currentPoint, unvisited, [...path, ...shortestPath])
}

const findClosestPoint = (allPoints, currentPoint) => {
    let minWeight = Infinity;
    let currenClosestPoint = currentPoint;

    allPoints.forEach((point) => {
        if (point === currentPoint) return;
        const weight = getWeight(point, currentPoint);
        if (minWeight > weight) {
            minWeight = weight;
            currenClosestPoint = point
        }
    })

    return [currenClosestPoint, minWeight];
}



const findPath = (adjList, entryPoint, products) => {
    const productsLength = products.length;

    if (!productsLength) {
        postMessage({ path: [], finish: true })
        return;
    }

    const keys = Object.keys(adjList);
    maxProgress = keys.length + productsLength;
    let cnt = productsLength;
    for (let i = 0; i < productsLength; i++) {
        maxProgress += cnt;
        cnt--;
    }

    for (let point of keys) {
        maxProgress += adjList[point].length
    }

    const pathGraph = generateLinesPathPoints(adjList, keys);
    const routePoints = Object.keys(pathGraph);
    const productsGraph = {};
    products.forEach((product) => {
        const [closestNeighbour, weight] = findClosestPoint(routePoints, product);
        productsGraph[product] = [{ coord: closestNeighbour, weight: weight }];
        pathGraph[closestNeighbour].push({ coord: product, weight: weight })
        currentProgress++;
    })

    const [closestGraphEntryPoint, weight] = findClosestPoint(routePoints, entryPoint);
    productsGraph[entryPoint] = [{ coord: closestGraphEntryPoint, weight: weight }];
    pathGraph[closestGraphEntryPoint].push({ coord: entryPoint, weight: weight })
    // postMessage({ finish: false, currentProgress: (currentProgress / maxProgress) * 100 })

    const graph = { ...pathGraph, ...productsGraph };
    const path = findShortestPath(graph, closestGraphEntryPoint, products);
    postMessage({ path: path, finish: true })
}

onmessage = function (e) {
    findPath(e.data.mapPath, e.data.mapEntryPoint, e.data.products);
}