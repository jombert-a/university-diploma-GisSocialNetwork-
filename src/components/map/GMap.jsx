import React from 'react'

import {useDispatch, useSelector} from "react-redux";

import { MapContainer, TileLayer} from 'react-leaflet';
import '../../style/map/GMapLeafet.css';
import 'leaflet/dist/leaflet.css';

import {apiEvents} from "../../api/Events";
import {apiLocation} from "../../api/Location";
import {apiObjects} from "../../api/Objects";

import {SET_CITY, SET_CLICKED_COORDINATES, SET_COORDS, SET_SIDEBAR_TYPE} from "../../store/reducers/globalReducer";
import {SET_OBJECTS} from "../../store/reducers/mapObjectsReducer";
import {SET_EVENTS} from "../../store/reducers/eventsReducer";

import GMapMarkers from "./GMapMarkers";

import {Link} from "react-router-dom";

const GMap = (props) => {
    const [center, setCenter] = React.useState([54.7230799, 55.9213715]);
    const [zoom, setZoom] = React.useState(13);
    const [map, setMap] = React.useState();
    const types = useSelector(state => state.global.entityTypes);
    const flyTo = useSelector(state => state.global.flyTo);
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

    React.useEffect(function () {
        if (types && map) {
            apiCallsByTypes()
        }
    }, [types, center])

    React.useEffect(() => {
        if (map && flyTo.lng && flyTo.lat) {
            map.flyTo([flyTo.lng, flyTo.lat], 17);
        }
    }, [flyTo.lng, flyTo.lat]);

    React.useEffect(() => {
        if (!map) return;
        // отрисовываем первый раз урл
        let coords = {
            lng: map.getCenter().lng,
            lat: map.getCenter().lat
        };
        dispatch({type: SET_COORDS, payload: coords})
        apiLocation.getCityByCoords(coords)
            .then ( response => {
                dispatch({type: SET_CITY, payload: response})
            });
        // ивент на совершенное движене по карте (важно, чтобы эффект срабатывал тоько один раз, иначе будет создаваться нвоый обработчик)
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
                     console.log('apiLocation moveend');
                     dispatch({type: SET_CITY, payload: response})
                 })
            // изменяем центр, чтобы вызвать ререндер и вызвать api calls
            setCenter([coords.lng, coords.lat])
        })
        map.on('click', function (ev) {
            let latlng = map.mouseEventToLatLng(ev.originalEvent);
            dispatch({type: SET_CLICKED_COORDINATES, payload: {lng: latlng.lng, lat: latlng.lat}})
        })
    }, [map]);

    return (
        <div>
            <MapContainer
                center={center}
                zoom={zoom}
                className={'g-map'}
                scrollWheelZoom={true}
                whenCreated={setMap}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GMapMarkers />
            </MapContainer>
            <Link to="/account" className={'g-map__account-link'} />
            <button className={'g-map__new-entity'} onClick={() => dispatch({type: SET_SIDEBAR_TYPE, payload:'new-entity'})}/>
        </div>
    )
};

export default GMap;