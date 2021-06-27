import React from 'react'

import {useDispatch, useSelector} from "react-redux";

import { MapContainer, TileLayer} from 'react-leaflet';
import '../../style/map/GMapLeafet.css';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

// Import the routing machine JS and CSS:
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

import {apiEvents} from "../../api/Events";
import {apiLocation} from "../../api/Location";
import {apiObjects} from "../../api/Objects";
import {apiPlaces} from "../../api/Places";

import {SET_CITY, SET_CLICKED_COORDINATES, SET_COORDS, SET_SIDEBAR_TYPE} from "../../store/reducers/globalReducer";
import {SET_OBJECTS} from "../../store/reducers/mapObjectsReducer";
import {SET_EVENTS} from "../../store/reducers/eventsReducer";

import GMapMarkers from "./GMapMarkers";

import {Link} from "react-router-dom";
import {SET_PLACES} from "../../store/reducers/placesReducer";

const GMap = (props) => {
    const [center, setCenter] = React.useState([54.7230799, 55.9213715]);
    const [map, setMap] = React.useState();
    const types = useSelector(state => state.global.entityTypes);
    const flyTo = useSelector(state => state.global.flyTo);
    const dispatch = useDispatch();

    React.useEffect(function () {
        if (types && map) {
                const corners = map.getBounds();
                const cUL = corners.getNorthEast();
                const cLR = corners.getSouthWest();
                types.forEach(el => {
                    switch(el) {
                        case 'objects':
                            apiObjects.getObjectsByCoords(cUL, cLR)
                                .then ( data => dispatch({type: SET_OBJECTS, payload: data} ));
                            break;
                        case 'places':
                            apiPlaces.getPlacesByCoords(cUL, cLR)
                                .then ( data => dispatch({type: SET_PLACES, payload: data}));
                            break;
                        case 'events':apiEvents.getEventsByCoords(cUL, cLR)
                            .then ( data => dispatch({type: SET_EVENTS, payload: data} ));
                            break;
                        default:
                            break;
                    }
                })
            }
    }, [map, types, dispatch])

    React.useEffect(() => {
        if (map && flyTo.lng && flyTo.lat) {
            map.flyTo([flyTo.lng, flyTo.lat], 17);
        }
    }, [map, flyTo.lng, flyTo.lat]);

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
            apiLocation.getCityByCoords(coords)
                 .then ( response => {
                     dispatch({type: SET_CITY, payload: response})
                 })
            // изменяем центр, чтобы вызвать ререндер и вызвать api calls
            setCenter([coords.lng, coords.lat])
        })
        map.on('click', function (ev) {
            let latlng = map.mouseEventToLatLng(ev.originalEvent);
            dispatch({type: SET_CLICKED_COORDINATES, payload: {lng: latlng.lng, lat: latlng.lat}})
        })
        return function cleanup () {
            map.off('click');
            map.off('moveend');
        }
    }, [map, dispatch]);

    // Routing machine ref
    const RoutingMachineRef = React.useRef(null)
    const route = useSelector(state => state.routes.selectedRoute.way.coordinates);

    React.useEffect(
        () => {
           if (map) {
               if (route.length > 0) {
                   if (route.length > 1 && RoutingMachineRef.current) {
                       map.removeControl(RoutingMachineRef.current);
                   }

                   const way = route.map(el => L.latLng(el[1], el[0]));
                   RoutingMachineRef.current = L.Routing.control({
                       waypoints: way,
                       createMarker: function(i, waypoint, n) {
                           return L.marker(waypoint.latLng, {icon: L.icon({iconUrl: require('../../assets/svg/location-pin.svg').default, iconSize: [38, 95]})})
                       }
                   }).addTo(map)
               }
               else {
                   if(RoutingMachineRef.current) {
                       map.removeControl(RoutingMachineRef.current);
                   }
               }
           }
        }, [map, route]
    )

    return (
        <div>
            <MapContainer
                center={center}
                zoom={13}
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