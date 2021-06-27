import React from 'react'

import {Marker} from 'react-leaflet';
import L from 'leaflet';
import '../../style/map/GMapLeafet.css';
import 'leaflet/dist/leaflet.css';

import {useSelector, useDispatch} from "react-redux";
import {SET_SELECTED_OBJECT} from "../../store/reducers/mapObjectsReducer";
import {SET_SELECTED_TYPE, SET_SIDEBAR_TYPE} from "../../store/reducers/globalReducer";
import {SET_SELECTED_EVENT} from "../../store/reducers/eventsReducer";

import iconData from '../../assets/svg/location-pin.svg'
import iconRed from '../../assets/svg/circle (1).svg'
import iconBlue from '../../assets/svg/circle.svg'
import iconPurple from '../../assets/svg/dry-clean.svg'
import {SET_SELECTED_PLACE} from "../../store/reducers/placesReducer";

// const iconData = "data:image/svg+xml,%3Csvg height='512pt' viewBox='-92 0 512 512.00037' width='512pt' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m327.203125 163.601562c0-89.398437-71.703125-162.046874-160.734375-163.5781245-89.523438-1.5351565-164.203125 69.9375005-166.4179688 159.4492185-1.4609372 59.019532 28.4648438 111.570313 74.7460938 141.539063 6.117187 3.960937 11.398437 9.085937 15.351563 15.210937 18.71875 28.988282 37.183593 60.105469 56.367187 114.980469 5.660156 16.195313 28.523437 16.164063 34.183594-.03125 25.058593-71.695313 58.523437-118.351563 57.832031-117.285156 2.972656-4.578125 6.878906-8.484375 11.507812-11.371094 46.363282-28.910156 77.164063-80.359375 77.164063-138.914063zm0 0' fill='%23f25c5c'/%3E%3Cpath d='m163.601562 275.40625c-62.792968 0-113.882812-51.085938-113.882812-113.882812 0-62.792969 51.089844-113.882813 113.882812-113.882813 62.792969 0 113.882813 51.089844 113.882813 113.882813 0 62.796874-51.089844 113.882812-113.882813 113.882812zm0 0' fill='%2300c3ff'/%3E%3Cpath d='m80.628906 161.523438c0-57.554688 42.914063-105.265626 98.425782-112.828126-5.054688-.691406-10.210938-1.054687-15.453126-1.054687-62.792968 0-113.882812 51.085937-113.882812 113.878906 0 62.796875 51.089844 113.882813 113.882812 113.882813 5.242188 0 10.398438-.363282 15.453126-1.050782-55.511719-7.5625-98.425782-55.273437-98.425782-112.828124zm0 0' fill='%2300aaf0'/%3E%3Cpath d='m185.914062 489.6875c0 12.324219-9.988281 22.3125-22.3125 22.3125-12.324218 0-22.3125-9.988281-22.3125-22.3125s9.988282-22.3125 22.3125-22.3125c12.324219 0 22.3125 9.988281 22.3125 22.3125zm0 0' fill='%23f25c5c'/%3E%3Cpath d='m177.421875 431.203125c-19.179687-54.875-37.648437-85.992187-56.363281-114.980469-3.953125-6.125-9.234375-11.25-15.355469-15.210937-46.277344-29.96875-76.203125-82.519531-74.742187-141.539063 2.058593-83.363281 66.984374-151.074218 148.207031-158.738281-4.1875-.394531-8.421875-.6367188-12.699219-.7109375-89.523438-1.5351565-164.203125 69.9375005-166.4179688 159.4492185-1.4609372 59.019532 28.4648438 111.570313 74.7460938 141.539063 6.117187 3.960937 11.398437 9.085937 15.351563 15.210937 18.71875 28.988282 37.183593 60.105469 56.367187 114.980469 5.214844 14.921875 25.023437 16.058594 32.535156 3.476563-.632812-1.0625-1.1875-2.214844-1.628906-3.476563zm0 0' fill='%23e54a4a'/%3E%3Cpath d='m168.074219 489.6875c0-7.296875 3.503906-13.777344 8.921875-17.847656-3.734375-2.804688-8.367188-4.464844-13.394532-4.464844-12.324218 0-22.3125 9.988281-22.3125 22.3125 0 12.320312 9.988282 22.3125 22.3125 22.3125 5.027344 0 9.664063-1.664062 13.394532-4.46875-5.417969-4.070312-8.921875-10.546875-8.921875-17.84375zm0 0' fill='%23e54a4a'/%3E%3Cpath d='m271.304688 124.511719-81.1875 81.1875c-9.4375-9.4375-19.394532-19.394531-29.441407-29.445313 15.84375-23.8125 15.847657-55.171875-.003906-78.988281l42.523437-42.519531c-10.46875-3.894532-21.660156-6.292969-33.3125-6.929688-32.875 32.875-65.792968 65.792969-68.824218 68.824219-10.082032-10.082031-19.070313-19.070313-26.289063-26.289063-6.097656 7.59375-11.242187 15.980469-15.253906 24.984376 25.128906 25.128906 61.832031 61.832031 61.914063 61.917968l-50.453126 50.453125c5.554688 7.75 12.058594 14.773438 19.332032 20.90625l51.242187-51.242187c.003907.003906 38.503907 38.503906 38.503907 38.507812 2.945312 2.941406 16.980468 16.976563 29.734374 29.730469 9-4.011719 17.390626-9.15625 24.984376-15.253906-6.714844-6.71875-15.09375-15.09375-24.539063-24.539063l67.210937-67.210937c-.300781-11.902344-2.441406-23.359375-6.140624-34.09375zm-131.445313 30.925781c-6.8125-6.808594-11.960937-11.960938-18.679687-18.679688 11.179687-11.179687 8.820312-8.820312 18.679687-18.675781 5.652344 11.71875 5.660156 25.628907 0 37.355469zm0 0' fill='%23e4eaf8'/%3E%3Cg fill='%23d8dce5'%3E%3Cpath d='m82.921875 138.742188c2.140625-10.492188 5.722656-20.46875 10.539063-29.703126-7.015626-7.015624-13.339844-13.339843-18.691407-18.6875-6.652343 8.285157-12.484375 18.296876-15.253906 24.984376 7.230469 7.226562 15.410156 15.410156 23.40625 23.40625zm0 0'/%3E%3Cpath d='m90.3125 248.613281 15.609375-15.609375c-6.121094-7.570312-11.285156-15.933594-15.324219-24.914062l-19.617187 19.617187c4.660156 6.996094 12.945312 15.523438 19.332031 20.90625zm0 0'/%3E%3C/g%3E%3C/svg%3E";
// const iconCircleRed = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cpath style='fill:%23901C0F;' d='M256,0v512c141.385,0,256-114.615,256-256S397.385,0,256,0z'/%3E%3Cpath style='fill:%23E0230D;' d='M470.793,256C470.793,114.615,374.626,0,256,0C114.615,0,0,114.615,0,256s114.615,256,256,256 C374.626,512,470.793,397.385,470.793,256z'/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A"
// const iconCircleBlue = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cpath style='fill:%232EA2EF;' d='M256,0v512c141.385,0,256-114.615,256-256S397.385,0,256,0z'/%3E%3Cpath style='fill:%2354BBFF;' d='M470.793,256C470.793,114.615,374.626,0,256,0C114.615,0,0,114.615,0,256s114.615,256,256,256 C374.626,512,470.793,397.385,470.793,256z'/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A"
// const iconCircleBlueLight = "data:image/svg+xml,%3Csvg id='Capa_1' enable-background='new 0 0 497 497' height='512' viewBox='0 0 497 497' width='512' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='m248.5 0v497c137.243 0 248.5-111.257 248.5-248.5s-111.257-248.5-248.5-248.5z' fill='%23a6cef4'/%3E%3Cpath d='m467 248.5c0-137.243-97.826-248.5-218.5-248.5-137.243 0-248.5 111.257-248.5 248.5s111.257 248.5 248.5 248.5c120.674 0 218.5-111.257 218.5-248.5z' fill='%23b3efff'/%3E%3C/g%3E%3C/svg%3E"

function getIcon(_iconSize, _iconName) {
    return L.icon({
        iconUrl: _iconName,
        iconSize: [_iconSize]
    })
}

const GMapMarkers = props => {
    const types = useSelector(state => state.global.entityTypes);
    const dispatch = useDispatch();

    const objectMarkersInfo = useSelector(state => state.mapObjects.objects);
    const [objectMarkers, setObjectsMarkers] = React.useState([]);

    const eventsInfo = useSelector(state => state.events.events);
    const [eventMarkers, setEventsMarkers] = React.useState();

    const placesInfo = useSelector(state => state.places.places);
    const [placeMarkers, setPlaceMarkers] = React.useState([]);

    const [selectedEntity, setSelectedEntity] = React.useState(<></>);
    const selectedEntityCoords = useSelector(state => state.global.flyTo);

    //selected entity
    React.useEffect(()=> {
        if (selectedEntityCoords.lng && selectedEntityCoords.lat) {
            setSelectedEntity(
                <Marker
                    position={[selectedEntityCoords.lng, selectedEntityCoords.lat]}
                    icon={getIcon(100, iconData)}>
                </Marker>)
        }
        else setSelectedEntity(<></>)
    }, [selectedEntityCoords.lng, selectedEntityCoords.lat, dispatch])

    // objects markers
    React.useEffect(
        () => {
            setObjectsMarkers(objectMarkersInfo?.map( (el, index) => (
                <Marker
                    key={index}
                    position={el.way.coordinates.reverse()}
                    icon={getIcon(16, iconRed)}
                    eventHandlers={
                        {
                            click: () => {
                                dispatch({type:SET_SELECTED_OBJECT, payload: el});
                                dispatch({type:SET_SELECTED_TYPE, payload: 'object'});
                                dispatch({type:SET_SIDEBAR_TYPE, payload: 'info'});
                            }
                        }
                    }>
                </Marker>
            )));
        }, [types, objectMarkersInfo, dispatch]
    );

    //event markers
    React.useEffect(
        () => {
                setEventsMarkers(eventsInfo.map( (el, index) => (
                    <Marker
                        key={index}
                        position={el.way.coordinates.reverse()}
                        icon={getIcon(16, iconBlue)}
                        eventHandlers={
                            {
                                click: () => {
                                    dispatch({type:SET_SELECTED_EVENT, payload: el});
                                    dispatch({type:SET_SELECTED_TYPE, payload: 'event'});
                                    dispatch({type:SET_SIDEBAR_TYPE, payload: 'info'});
                                }
                            }
                        }>
                    </Marker>
                )));
        }, [types, eventsInfo, dispatch]
    )

    //place markers
    React.useEffect(
        () => {
            setPlaceMarkers(placesInfo.map( (el, index) => (
                <Marker
                    key={index}
                    position={el.way.coordinates.reverse()}
                    icon={getIcon(16, iconPurple)}
                    eventHandlers={
                        {
                            click: () => {
                                dispatch({type:SET_SELECTED_PLACE, payload: el});
                                dispatch({type:SET_SELECTED_TYPE, payload: 'place'});
                                dispatch({type:SET_SIDEBAR_TYPE, payload: 'info'});
                            }
                        }
                    }>
                </Marker>
            )));
        }, [types, placesInfo, dispatch]
    )

    return (
        <>
            {objectMarkers}
            {eventMarkers}
            {placeMarkers}
            {selectedEntity}
        </>
    )
}
export default GMapMarkers;
