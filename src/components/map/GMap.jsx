import React from 'react'

import '../../style/map/GMap.css';
import GSearch from "../search/GSearch";
import GMapNavigation from "./GMapNavigation";

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import {setCoords} from "../../store/reducers/global";
import { connect } from "react-redux";
import {apiLocation} from "../../api";

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
        props.setCoords({lng: map.current.getCenter().lng.toFixed(4), lat: map.current.getCenter().lat.toFixed(4)});
    });

    React.useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('moveend', () => {
            let coords = {
                lng: map.current.getCenter().lng.toFixed(4),
                lat: map.current.getCenter().lat.toFixed(4)
            }
            setLng(coords.lng);
            setLat(coords.lat);
            setZoom(map.current.getZoom().toFixed(2));
            props.setCoords(coords);
            apiLocation.getCityByCoords(coords);
        });
    });


    const updateZoom = (newZoom) => {
        if ((zoom + newZoom) !== 20 && (zoom + newZoom) !== 0)
        {
            setZoom(zoom + newZoom);
            map.current.setZoom(zoom);
        }
    }

    return (
        <div className="map-wrapper">
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <GSearch />
            <GMapNavigation setZoom={updateZoom} />
            <div ref={mapContainer} className="map-container"/>
        </div>
    )
};

export default connect(
    null,
    { setCoords }
) (GMap);