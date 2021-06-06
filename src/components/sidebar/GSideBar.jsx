import React, {useEffect} from 'react'
import '../../style/sidebar/GSideBar.css';
import Icons from "../common/icons";
import GSearch from "../search/GSearch";
import {useDispatch, useSelector} from "react-redux";
import {ADD_TYPE, DELETE_TYPE, FLY_TO, SET_SELECTED_TYPE} from "../../store/reducers/globalReducer";
import GSideBarInfoController from "./GSideBarInfoController";
import {apiClassifier, apiEvents, apiObjects} from "../../api";
import GSideBarCategories from "./Modules/GSideBarCategories";
import GSideBarInteresting from "./Modules/GSideBarInteresting";

const GSideBar = (props) => {
    const [hidden, setHidden] = React.useState(false);
    const [location, setLocation] = React.useState('район');
    const [selectedType, setSelectedType] = React.useState('');
    const [events, setEvents] = React.useState();
    const [categories, setCategories] = React.useState();

    const dispatch = useDispatch();
    const newLocation = useSelector(state => state.global.location);
    const newSelectedType = useSelector(state => state.global.selectedType);
    const types = useSelector(state => state.global.types);
    const token = useSelector(state => state.auth.accessToken);

    useEffect(() => {
        setLocation(newLocation.ru);
        if (newLocation.en !== 'area') {
            console.log('api getEventsInCity');
            apiEvents.getEventsInCity(newLocation.ru)
                .then( response => setEvents(response) )
            apiClassifier.getCategoryClassifiers()
                .then( response => setCategories(response) )
        }
    }, [newLocation.en, newLocation.ru]);

    const categoriesElem = React.useMemo(() => <GSideBarCategories categories={categories} />, [categories]);
    const eventsElem = React.useMemo(() => <GSideBarInteresting events={events} />, [events]);

    useEffect(() => {
        setSelectedType(newSelectedType)
        if (newSelectedType) setHidden(false);
    }, [newSelectedType]);

    function testHandler() {
        apiObjects.postObjectTest(token)
            .then(result => console.log(result));
    }

    function typesHandler(type) {
        if (types.includes(type)) {
            deleteTypeHandler(type)
        }
        else {
            addTypeHandler(type);
        }
    }

    function deleteTypeHandler(type) {
        dispatch({type: DELETE_TYPE, payload: type});
        dispatch({type: `SET_${type.toUpperCase()}`, payload: []});
    }

    function  addTypeHandler(type) {
        dispatch({type: ADD_TYPE, payload: type});
    }

    return (
        <div className={`g-side-bar`}>
            <div className={`g-side-bar__inner ${hidden ? 'g-side-bar__inner--hidden' : ''}`}>
                <button onClick={() => testHandler()}> test </button>
                {selectedType && <GSideBarInfoController type={selectedType} />}
                <div className={`g-side-bar__header`}>
                    <GSearch />
                    <h3>{location}</h3>
                </div>
                <div className={`g-side-bar__body`}>
                    <h4> Навигация </h4>
                    <ul className={`g-side-bar__nav`}>
                        <li className={`g-side-bar__nav-link ${types.includes('events') ? 'active' : ''}`}
                            onClick={() => typesHandler('events')}> Cобытия </li>
                        <li className={`g-side-bar__nav-link ${types.includes('objects') ? 'active' : ''}`}
                            onClick={() => typesHandler('objects')}> Объекты </li>
                        <li className={`g-side-bar__nav-link`}> Места   </li>
                        <li className={`g-side-bar__nav-link`}> Машруты </li>
                    </ul>
                    <h4> Интересное рядом </h4>
                    {eventsElem}
                    <h4> Категории </h4>
                    {categoriesElem}
                    <div className={`g-side-bar__magic`}>Подобрать для меня</div>
                </div>
            </div>
            <div  className={`g-side-bar__hide-btn ${hidden ? 'g-side-bar__hide-btn--active' : ''} ${selectedType ? 'g-side-bar__hide-btn--down' : ''}`}
                  onClick={() => setHidden(!hidden)}>
                <Icons name='arrow' color='#000' size='32' className='' />
            </div>
            {
                selectedType &&
                <div className={`g-side-bar__hide-btn`}
                     onClick={() => {
                         dispatch({type: SET_SELECTED_TYPE, payload: null})
                         dispatch({type: FLY_TO, payload: {lng: null, lat: null}})
                     }}>
                    <Icons name='close' color='#000' size='32' className='' />
                </div>
            }
        </div>
    )
}

export default GSideBar;
