import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store, { IStoreState } from './store';
import { EDITOR_MODES } from '../globals/constants';
import { IMap, IShop, IProduct } from '../globals/interfaces';
import { findEdjeIndex, getWeight } from '../components/Map/MapUtils';

//reducers
export const mapSlice = createSlice({
    name: 'map',
    initialState: {
        adjList: {} as IMap,
        entryPoint: '0,0',
        products: [] as IProduct[],
        shop: {} as IShop,
        editorMode: EDITOR_MODES.ADDING_POINTS,
        mapScale: 5
    },
    reducers: {
        setAdjList: (state, action) => {
            state.adjList = action.payload
        },
        setEntryPoint: (state, action) => {
            state.entryPoint = action.payload
        },
        setMapProducts: (state, action) => {
            state.products = action.payload
        },
        setMapShop: (state, action) => {
            state.shop = action.payload;
        },
        setEditorMode: (state, action) => {
            state.editorMode = action.payload
        },
        setMapScale: (state, action) => {
            state.mapScale = action.payload
        },
        moveCurrentPoint: (state, action: PayloadAction<{ newX: string, newY: string, currentPointCoords: string }>) => {
            const { newX, newY, currentPointCoords } = action.payload;

            if (state.adjList[newX + ',' + newY]) return;

            const currentPointNeighbours = state.adjList[currentPointCoords];
            if (!currentPointNeighbours) return;

            for (let neighbour of currentPointNeighbours) {
                const list = state.adjList[neighbour.coord];
                if (!list) return;
                const currentPointIndex = findEdjeIndex(list, currentPointCoords);
                if (currentPointIndex === -1) return;
                list[currentPointIndex] = { coord: newX + ',' + newY, weight: getWeight(neighbour.coord, newX + ',' + newY) };
            }

            const { [currentPointCoords]: deleted, ...objectWithoutDeletedProp } = state.adjList;
            objectWithoutDeletedProp[newX + ',' + newY] = currentPointNeighbours;
            state.adjList = objectWithoutDeletedProp;
        },
        removePointFromMap: (state, action: PayloadAction<{ x: string, y: string }>) => {
            const { x, y } = action.payload;
            const edjes = state.adjList[x + ',' + y];

            for (let edje of edjes) {
                //@ts-ignore
                this.mapSlice.caseReducers.removeEdje(state, { payload: { point1: edje.coord, point2: (x + ',' + y) } });
            }

            const { [x + ',' + y]: deleted, ...objectWithoutDeletedProp } = state.adjList;
            state.adjList = objectWithoutDeletedProp;
        },
        removeEdje: (state, action: PayloadAction<{ point1: string, point2: string }>) => {
            const mapValue1 = state.adjList[action.payload.point1];
            if (!mapValue1 || !mapValue1.length) return;

            const edje1Index = findEdjeIndex(mapValue1, action.payload.point2);
            if (edje1Index === -1) return;

            state.adjList[action.payload.point1].splice(edje1Index, 1);
        },
        addMapEdje: (state, action: PayloadAction<{ point1: string, point2: string }>) => {
            const { point1, point2 } = action.payload;

            state.adjList[point1].push({ coord: point2, weight: getWeight(point1, point2) });
            state.adjList[point2].push({ coord: point1, weight: getWeight(point1, point2) });
        },
        addMapVertex: (state, action: PayloadAction<{ point: string }>) => {
            state.adjList[action.payload.point] = [];
        },
        addPointBetweenOtherTwoMap: (state, action: PayloadAction<{ point1: string, point2: string, newPoint: string }>) => {
            const { point1, point2, newPoint } = action.payload;

            //@ts-ignore
            this.mapSlice.caseReducers.removeEdje(state, { payload: { point1: point1, point2: point2 } });
            //@ts-ignore
            this.mapSlice.caseReducers.removeEdje(state, { payload: { point1: point2, point2: point1 } });

            state.adjList[newPoint] = [{ coord: point1, weight: getWeight(point1, newPoint) }, { coord: point2, weight: getWeight(point2, newPoint) }];
            state.adjList[point1].push({ coord: newPoint, weight: getWeight(point1, newPoint) });
            state.adjList[point2].push({ coord: newPoint, weight: getWeight(newPoint, point2) });
        },
        removeLineMap: (state, action: PayloadAction<{ point1: string, point2: string }>) => {
            const { point1, point2 } = action.payload;

            //@ts-ignore
            this.mapSlice.caseReducers.removeEdje(state, { payload: { point1: point1, point2: point2 } });
            //@ts-ignore
            this.mapSlice.caseReducers.removeEdje(state, { payload: { point1: point2, point2: point1 } });
        },

    }
});

//actions
export const { setAdjList, setEntryPoint, setMapProducts, setMapShop, setMapScale, setEditorMode, moveCurrentPoint, removePointFromMap, addMapEdje, addMapVertex, addPointBetweenOtherTwoMap, removeLineMap } = mapSlice.actions;

//selectors
export const selectAdjList = (state: IStoreState) => state.mapState.adjList;
export const selectEntryPoint = (state: IStoreState) => state.mapState.entryPoint;
export const selectMapProducts = (state: IStoreState) => state.mapState.products;
export const selectMapShop = (state: IStoreState) => state.mapState.shop;
export const selectEditorMode = (state: IStoreState) => state.mapState.editorMode;
export const selectMapScale = (state: IStoreState) => state.mapState.mapScale;

export default mapSlice.reducer;