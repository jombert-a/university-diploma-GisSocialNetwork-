import React, {useEffect} from 'react'

import {connect, useDispatch, useSelector} from "react-redux";

import { MapContainer, TileLayer} from 'react-leaflet';
import '../../style/map/GMapLeafet.css';
import 'leaflet/dist/leaflet.css';

import {apiEvents, apiLocation, apiObjects} from "../../api";

import {SET_CITY, SET_COORDS, setCity, setCoords} from "../../store/reducers/globalReducer";
import {SET_OBJECTS, setObjects} from "../../store/reducers/mapObjectsReducer";
import {SET_EVENTS, setEvents} from "../../store/reducers/eventsReducer";

import GMapMarkers from "./GMapMarkers";

import {Link} from "react-router-dom";

const GMap = (props) => {
    const [center, setCenter] = React.useState([54.7230799, 55.9213715]);
    const [zoom, setZoom] = React.useState(13);
    const [map, setMap] = React.useState();
    const types = useSelector(state => state.global.types);
    const dispatch = useDispatch();

    function apiCallsByTypes() {
        if (zoom >= 10) {
            const corners = map.getBounds();
            const cUL = corners.getNorthEast();
            const cLR = corners.getSouthWest();
            types.forEach(el => {
                switch(el) {
                    case 'objects':
                        apiObjects.getObjectsByCoords(cUL, cLR)
                            .then ( data => dispatch({type: SET_OBJECTS, payload: data} ));
                        break;
                    case 'events':
                        apiEvents.getEventsByCoords(cUL, cLR)
                            .then ( data => dispatch({type: SET_EVENTS, payload: data} ));
                        break;
                    default:
                        break;
                }
            })
        }
    }

    useEffect(function () {
        if (types && map) {
            apiCallsByTypes()
        }
    }, [types, center])

    useEffect(() => {
        if (!map) return;
        map.on('moveend', function () {
            // координаты середины экрана
            let coords = {
                lng: map.getCenter().lng,
                lat: map.getCenter().lat
            }
            // отправляем в стор
            dispatch({type: SET_COORDS, payload: coords})
            // сайд запрос к апи, получаем ифнормацию о городе
            // так делать нельзя, но это быстрее, чем вводить санки или сагу
            apiLocation.getCityByCoords(coords)
                 .then ( response => {
                     dispatch({type: SET_CITY, payload: response})
                 })
            // изменяем центр, чтобы вызвать ререндер и вызвать api calls
            setCenter([coords.lng, coords.lat])
        })
        map.on('click', function () {
            console.log('clicked');
        })
    }, [map]);

    return (
        <div>
            <MapContainer
                center={center}
                zoom={zoom}
                className={'g-map'}
                scrollWheelZoom={false}
                whenCreated={setMap}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GMapMarkers />
            </MapContainer>
            <Link to="/account" className={'g-map__account-link'} />
        </div>
    )
};

export default connect(
    null,
    { setCoords, setCity, setObjects, setEvents }
) (GMap);
