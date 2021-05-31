import React, {useEffect} from 'react'
import {connect, useSelector} from "react-redux";

import { MapContainer, TileLayer} from 'react-leaflet';
import '../../style/map/GMapLeafet.css';
import 'leaflet/dist/leaflet.css';

import {apiEvents, apiLocation, apiObjects} from "../../api";

import {setCity, setCoords} from "../../store/reducers/globalReducer";
import {setObjects} from "../../store/reducers/mapObjectsReducer";

import GMapMarkers from "./GMapMarkers";
import {setEvents} from "../../store/reducers/eventsReducer";
import {Link} from "react-router-dom";

const GMap = (props) => {
    const center = [54.7230799, 55.9213715];
    const zoom = 10;
    const [map, setMap] = React.useState();
    const types = useSelector(state => state.global.types);

    useEffect(() => {
        if (!map) return;
        map.on('moveend', function () {
            // координаты середины экрана
            let coords = {
                lng: map.getCenter().lng,
                lat: map.getCenter().lat
            }
            // отправляем в стор
            props.setCoords(coords);
            // сайд запрос к апи, получаем ифнормацию о городе
            // так делать нельзя, но это быстрее, чем вводить санки или сагу
            apiLocation.getCityByCoords(coords)
                .then ( response => {
                    props.setCity(response)
                });
            // получаем объекты по левой верхней и правой нижне координатам
            const corners = map.getBounds();
            const cUL = corners.getNorthEast();
            const cLR = corners.getSouthWest();
            if (zoom <= 15) {
                types.forEach(el => {
                    switch(el) {
                        case 'objects':
                            apiObjects.getObjectsByCoords(cUL, cLR)
                                .then ( data => {
                                    props.setObjects(data);
                                });
                            break;
                        case 'events':
                            apiEvents.getEventsByCoords(cUL, cLR)
                                .then ( data => props.setEvents(data));
                        default:
                            return '';
                    }
                })
            }
        })
    });
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
