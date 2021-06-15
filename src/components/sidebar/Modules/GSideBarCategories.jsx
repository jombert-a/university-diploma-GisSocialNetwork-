import React from 'react'
import {apiEvents} from "../../../api/Events";
import {apiObjects} from "../../../api/Objects";
import {SET_OBJECTS} from "../../../store/reducers/mapObjectsReducer";
import {useDispatch} from "react-redux";
import {SET_EVENTS} from "../../../store/reducers/eventsReducer";

const GSideBarCategories = props => {
    const [categoriesDOM, setCategoriesDOM] = React.useState([]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        function categoriesHandler(el) {
            switch (el.typeId) {
                case 1: {
                    apiObjects.getObjectsByClassifier(el.idCategoryClassifier)
                        .then ( data => dispatch({type: SET_OBJECTS, payload: data} ));
                    break;
                }
                case 3: {
                    apiEvents.getEventsByClassifierId(el.idCategoryClassifier)
                        .then ( data => dispatch({type: SET_EVENTS, payload: data} ));
                    break;
                }
                default: {
                    return '';
                }
            }
        }
        let array = [];
        if (props.categories) {
            props.categories.forEach((el, index) => {
                const category =
                    <li className={`g-side-bar__category`} key={index} onClick={() => categoriesHandler(el)}>
                        <div className={`g-side-bar__category-icon`} />
                        {el.classifierName}
                    </li>
                array.push(category);
            })
        }
        setCategoriesDOM(array);
    }, [props.categories, dispatch])
    return (
        <>
            <ul className={`g-side-bar__categories`}>
                {categoriesDOM}
            </ul>
        </>
    )
}

export default GSideBarCategories;