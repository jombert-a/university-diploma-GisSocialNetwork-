import React from 'react'

import '../../style/map/GMap.css';
import GSearch from "../search/GSearch";
import GMapNavigation from "./GMapNavigation";

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoicmJydGEiLCJhIjoiY2trODU3ZTl3MGtldTJ2bXZhZjg2bDA2YyJ9.UNEZm5Vf_VqCc-gTOd7gmA';

const GMap = (props) => {
    const mapContainer = React.useRef(null);
    const map = React.useRef(null);
    const [lng, setLng] = React.useState(-70.9);
    const [lat, setLat] = React.useState(42.35);
    const [zoom, setZoom] = React.useState(9);

    React.useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    const updateZoom = (newZoom) => {
        console.log(zoom);
        if ((zoom + newZoom) !== 20 && (zoom + newZoom) !== 0)
        {
            setZoom(zoom + newZoom);
            map.current.setZoom(zoom);
        }
    }

    return (
        <div className="map-wrapper">
            <GSearch />
            <GMapNavigation setZoom={updateZoom} />
            <div ref={mapContainer} className="map-container"/>
        </div>
    )
};

export default GMap;