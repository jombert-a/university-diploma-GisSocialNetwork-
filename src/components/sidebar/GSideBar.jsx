import React from 'react'
import '../../style/sidebar/GSideBar.css';
import Icons from "../common/icons";
import GSearch from "../search/GSearch";
import {useDispatch, useSelector} from "react-redux";
import {ADD_TYPE, DELETE_TYPE, SET_SELECTED_TYPE} from "../../store/reducers/globalReducer";
import GSideBarInfoController from "./GSideBarInfoController";
import {apiClassifier} from "../../api/Classifier";
import {apiEvents} from "../../api/Events";
import GSideBarCategories from "./Modules/GSideBarCategories";
import GSideBarInteresting from "./Modules/GSideBarInteresting";

const GSideBar = (props) => {
    const [hidden, setHidden] = React.useState(false);
    const [selectedType, setSelectedType] = React.useState('');
    const [events, setEvents] = React.useState();
    const [categories, setCategories] = React.useState();

    const dispatch = useDispatch();
    const newLocation = useSelector(state => state.global.location);
    const newSelectedType = useSelector(state => state.global.selectedEntityType);
    const types = useSelector(state => state.global.entityTypes);

    React.useEffect(() => {
        if (newLocation.en !== 'area') {
            apiEvents.getEventsInCity(newLocation.ru)
                .then( response => setEvents(response) )
            apiClassifier.getCategoryClassifiers()
                .then( response => setCategories(response) )
        }
    }, [newLocation.en, newLocation.ru]);

    const categoriesElem = React.useMemo(() => <GSideBarCategories categories={categories} />, [categories]);
    const eventsElem = React.useMemo(() => <GSideBarInteresting events={events} />, [events]);

    React.useEffect(() => {
        setSelectedType(newSelectedType)
        if (newSelectedType) setHidden(false);
    }, [newSelectedType]);


    function typesHandler(type, e) {
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
        <>
            <div className={`g-side-bar__header`}>
                <GSearch />
            </div>
            <div className={`g-side-bar__body`}>
                <h4> Навигация </h4>
                <ul className={`g-side-bar__nav`}>
                    <li className={`g-side-bar__nav-link ${types.includes('events') ? 'active' : ''}`}
                        onClick={(e) => typesHandler('events', e)}> Cобытия </li>
                    <li className={`g-side-bar__nav-link ${types.includes('objects') ? 'active' : ''}`}
                        onClick={() => typesHandler('objects')}> Объекты </li>
                    <li className={`g-side-bar__nav-link`}> Места   </li>
                    <li className={`g-side-bar__nav-link`}> Машруты </li>
                </ul>
                <h4> Интересное рядом </h4>
                {eventsElem}
                <h4> Категории </h4>
                {categoriesElem}
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
                     }}>
                    <Icons name='close' color='#000' size='32' className='' />
                </div>
            }
        </>
    )
}

export default GSideBar;
