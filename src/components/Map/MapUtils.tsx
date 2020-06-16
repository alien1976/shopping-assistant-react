import { IMap } from "../../globals/interfaces";

export const getWeight = (point1: string, point2: string) => {
    const [x1, y1] = point1.split(',');
    const [x2, y2] = point2.split(',');

    return Math.sqrt(Math.pow(parseFloat(y2) - parseFloat(y1), 2) + Math.pow(parseFloat(x2) - parseFloat(x1), 2)).toString()
}

export const findEdjeIndex = (edjesArray: { coord: string, weight: string }[], pointCoords: string) => {
    for (let i = 0; i < edjesArray.length; i++) {
        if (edjesArray[i].coord === pointCoords) {
            return i;
        }
    }
    return -1;
}

export const removeEdje = (prevMap: IMap, point1: string, point2: string) => {
    const mapValue1 = prevMap[point1];
    if (!mapValue1 || !mapValue1.length) return;

    const edje1Index = findEdjeIndex(mapValue1, point2);
    if (edje1Index === -1) return;

    prevMap[point1] = [...mapValue1.slice(0, edje1Index), ...mapValue1.slice(edje1Index + 1)]
}

export const addPointBetweenOtherTwo = (map: IMap, point1: string, point2: string, newPoint: string) => {
    const newMap = { ...map }
    removeEdje(newMap, point1, point2);
    removeEdje(newMap, point2, point1);
    return {
        ...newMap,
        [newPoint]: [{ coord: point1, weight: getWeight(point1, newPoint) }, { coord: point2, weight: getWeight(point2, newPoint) }],
        [point1]: [...newMap[point1], { coord: newPoint, weight: getWeight(point1, newPoint) }],
        [point2]: [...newMap[point2], { coord: newPoint, weight: getWeight(newPoint, point2) }]
    }
}