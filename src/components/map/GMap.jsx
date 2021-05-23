import React from 'react'

import '../../style/map/GMap.css';
import GMapNavigation from "./GMapNavigation";

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import {setCity, setCoords} from "../../store/reducers/globalReducer";
import {connect} from "react-redux";
import {apiLocation} from "../../api";
import GSideBar from "../layout/GSideBar";

mapboxgl.accessToken = 'pk.eyJ1IjoicmJydGEiLCJhIjoiY2trODU3ZTl3MGtldTJ2bXZhZjg2bDA2YyJ9.UNEZm5Vf_VqCc-gTOd7gmA';

const GMap = (props) => {
    const mapContainer = React.useRef(null);
    const map = React.useRef(null);
    const [lng] = React.useState(56.0414);
    const [lat] = React.useState(54.7431);
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
            props.setCoords(coords);
            apiLocation.getCityByCoords(coords)
                .then ( response => props.setCity(response) );
            // const canvas = map.current.getCanvas()
            // const w = canvas.width
            // const h = canvas.height
            // const cUL = map.current.unproject ([0,0]).toArray()
            // const cLR = map.current.unproject ([w,h]).toArray()
            // if (zoom >= 15) {
            //     apiLocation.getObjectsByCoords(cUL, cLR)
            //         .then ( data => {
            //             data.map(el => {
            //                 return '';
            //             });
            //         });
            // }
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
            <div ref={mapContainer} className="map-container">
                <GMapNavigation setZoom={updateZoom} />
                <GSideBar />
            </div>
        </div>
    )
};

export default connect(
    null,
    { setCoords, setCity }
) (GMap);