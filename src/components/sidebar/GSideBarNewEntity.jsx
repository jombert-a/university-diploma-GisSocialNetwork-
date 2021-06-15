import React from 'react'
import {useSelector} from "react-redux";
import GSideBarNewEntityForm from "./GSideBarNewEntityForm";

const GSideBarNewEntity = props => {
    const [entity, setEntity] = React.useState('object');
    const [lng, setLng] = React.useState('');
    const [lat, setLat] = React.useState('');

    const clickedLng = useSelector(state => state.global.clickedCoordinates.lng);
    const clickedLat = useSelector(state => state.global.clickedCoordinates.lat);

    React.useMemo( () => {
        setLng(clickedLng);
        setLat(clickedLat)
    }, [clickedLng, clickedLat]);

    function changeHandler(e) {
        setEntity(e.target.value);
    }

    return (
        <div className={`g-side-bar__body`}>
            <h4>Добавление новой сущности</h4>
            <div className={'g-side-bar-entity'}>
                <div className={`g-side-bar-entity__choice`}>
                    <label className={'label-radio'}>
                        <input type="radio" value="object" checked={entity === 'object'} name="entity" onChange={(e) => changeHandler(e)}/>
                        <span className="label-radio__button" />
                        <span>Объект</span>
                    </label>
                    <label className={'label-radio'}>
                        <input type="radio" value="event" checked={entity === 'event'} name="entity" onChange={(e) => changeHandler(e)}/>
                        <span className="label-radio__button" />
                        <span>Событие</span>
                    </label>
                    <label className={'label-radio'}>
                        <input type="radio" value="place" checked={entity === 'place'} name="entity" onChange={(e) => changeHandler(e)}/>
                        <span className="label-radio__button" />
                        <span>Место</span>
                    </label>
                    <label className={'label-radio'}>
                        <input type="radio" value="route" checked={entity === 'route'} name="entity" onChange={(e) => changeHandler(e)}/>
                        <span className="label-radio__button" />
                        <span>Маршрут</span>
                    </label>
                </div>
                {
                    entity !== 'route' &&
                    <div className={`g-side-bar-entity__coords-picker`}>
                        <div className={`g-side-bar-entity__coords`}>
                            <label>
                                <p>Долгота</p>
                                <input type="number" value={lng} onChange={(e) => setLng(e.target.value)} className={'input input--100w'}/>
                            </label>
                            <label>
                                <p>Широта</p>
                                <input type="number" value={lat} onChange={(e) => setLat(e.target.value)} className={'input input--100w'}/>
                            </label>
                        </div>
                        <span>Можете кликнуть на карте или ввести самостоятельно</span>
                    </div>
                }
                {
                    ((lng && lat) || (entity === 'route')) &&
                    <GSideBarNewEntityForm type={entity} lng={lng} lat={lat} />
                }
            </div>
        </div>
    )
}

export default GSideBarNewEntity;