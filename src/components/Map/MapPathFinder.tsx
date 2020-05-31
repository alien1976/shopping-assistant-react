import * as React from 'react';
import './Map.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';
import { selectFastestPath } from '../../redux/cartReducer';

const POINT_COLOR = 'black';
const POINT_STROKE = '#ff1a1a';
const ANCHOR_POINT_COLOR = 'white';
const ANCHOR_POINT_STROKE = '#cccccc'
const PRODUCT_COLOR = '#cc0000';
const START_POINT_STROKE = 'white'
const START_POINT_COLOR = '#208000';
const PATH_LINE_FILL_COLOR = '#6699ff';
const PATH_LINE_STROKE_COLOR = '#6699ff';

interface IMapPathFinder {
    products: string[]
    mapImgUrl: string
    loadProcess: boolean
    startPoint: string
}

const MapPathFinder = ({ products, mapImgUrl, loadProcess, startPoint }: IMapPathFinder) => {
    const fastestPath = useSelector(selectFastestPath);
    const [routeScale, setRouteScale] = React.useState(7);
    const svgRef = React.useRef(null);

    const changeScaleFactor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const changeFactor = parseInt(event.target.value);
        setRouteScale(changeFactor)
    }

    let stopCnt = 1;
    const drawnPoints: string[] = [];
    const drawnLines: string[] = [];
    const loading = loadProcess;
    const mapStyles = React.useMemo(() => {
        return {
            background: 'black no-repeat center top',
            backgroundSize: 'cover',
            //@ts-ignore
            position: 'relative' as PositionProperty,
            backgroundImage: `url(${mapImgUrl})`,
            width: `100%`,
            height: `100%`,
            filter: loading ? 'blur(2.5px)' : '',
            opacity: loading ? '0.5' : '1',
            //@ts-ignore
            pointerEvents: loading ? 'none' as PointerEventsProperty : '' as PointerEventsProperty
        }
    }, [mapImgUrl, loading])

    const loaderStyles = React.useMemo(() => {
        return {
            width: '15%',
            height: '15%',
            marginBottom: '10px'
        }
    }, [])

    const [startX, startY] = startPoint.split(',');

    return (<>
        <div className="map-wrapper">
            {loading &&
                <div className='progress-bar'>
                    <CircularProgress style={loaderStyles} />
                    <span>Calculating path. Please wait... </span>
                </div>
            }
            <div className="map" style={mapStyles}>
                <svg ref={svgRef} version="1.1" viewBox="0.0 0.0 500.0 488.0" fill="none" stroke="none" >
                    <g id="path-curves">
                        {fastestPath.map((value, index) => {
                            if (value === undefined) return null;
                            if (!fastestPath[index + 1]) return null;
                            if (drawnLines.indexOf(value + ',' + fastestPath[index + 1]) !== -1) return null;
                            drawnLines.push(value + ',' + fastestPath[index + 1]);
                            const [x1, y1] = value.split(',');
                            const [x2, y2] = fastestPath[index + 1].split(',');
                            return (
                                <React.Fragment key={'shortest-path-(' + value + ',' + fastestPath[index + 1] + ')'}>
                                    <line x1={x1} x2={x2} y1={y1} y2={y2} strokeLinecap="round" fill={PATH_LINE_FILL_COLOR} stroke={PATH_LINE_STROKE_COLOR} strokeWidth={routeScale - 4}></line>
                                    {products.indexOf(value) === -1 && <circle cx={x1} cy={y1} r={routeScale - (4 * 2)} fill={ANCHOR_POINT_COLOR} stroke={ANCHOR_POINT_STROKE}></circle>}
                                    {/* {products.indexOf(fastestPath[index + 1]) !== -1 && <circle cx={x2} cy={y2} r={routeScale - 2} fill={POINT_COLOR} stroke={POINT_STROKE}></circle>} */}
                                </React.Fragment>
                            )
                        })}
                    </g>
                    <circle cx={startX} cy={startY} r={routeScale + 4} fill={START_POINT_COLOR} stroke={START_POINT_STROKE}></circle>
                    <g id="products-on-path">
                        {fastestPath.map((value, index) => {
                            if (value === undefined) return null;
                            if (drawnPoints.indexOf(value) !== -1) return null;
                            drawnPoints.push(value);
                            const [x1, y1] = value.split(',');
                            return (
                                <React.Fragment key={'products-path-(' + x1 + ',' + y1 + ')'}>
                                    {products.indexOf(value) !== -1 &&
                                        (<>
                                            <circle cx={x1} cy={y1} r={routeScale + 2} fill={PRODUCT_COLOR} stroke={POINT_STROKE}></circle>
                                            <text x={x1} y={y1} fontSize={routeScale * 2} textAnchor="middle" fill="white" dy=".35em">{stopCnt++}</text>
                                        </>)}
                                </React.Fragment>
                            )
                        })}
                    </g>
                </svg>
            </div>
        </div>
        {!loading &&
            <>
                <div className="map-route-scale">
                    <label htmlFor="route-scale">Route scale:</label>
                    <input onChange={changeScaleFactor} type="range" id="route-scale" name="points" min="5" max="10" step="1" value={routeScale} />
                </div>
            </>}
    </>)
}

export default React.memo(MapPathFinder);