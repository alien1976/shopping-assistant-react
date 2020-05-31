import * as React from 'react';
import './Map.css'

const POINT_COLOR = 'black';
const POINT_STROKE = 'white';

const ProductLocationMap = ({ productCoordinates, mapImgUrl }: { productCoordinates: string, mapImgUrl: string }) => {
    const [x1, y1] = productCoordinates.split(',');

    const mapStyles = React.useMemo(() => {
        return {
            cursor: '',
            backgroundImage: `url(${mapImgUrl})`,
        }
    }, [mapImgUrl])

    return (
        <>
            <div className="map-wrapper" style={{ margin: '0' }}>
                <div className="map" style={mapStyles}>
                    <svg version="1.1" viewBox="0.0 0.0 500.0 488.0" fill="none" stroke="none" >
                        <circle cx={x1} cy={y1} r={7} fill={POINT_COLOR} stroke={POINT_STROKE}></circle>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default ProductLocationMap;