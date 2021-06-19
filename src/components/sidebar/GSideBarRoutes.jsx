import React from 'react'
import {apiRoutes} from "../../api/Routes";
import {useDispatch} from "react-redux";
import {SET_SELECTED_ROUTE} from "../../store/reducers/routesReducer";
import style from './StyleModules/routes.module.css'
import {SET_SELECTED_TYPE, SET_SIDEBAR_TYPE} from "../../store/reducers/globalReducer";

const GSideBarRoutes = props => {
    const [routes, setRoutes] = React.useState([]);
    const [routesDOM, setRoutesDOM] = React.useState([]);
    const dispatch = useDispatch();

    React.useEffect(
        () => {
            apiRoutes.getRoutes()
                .then(result => setRoutes(result))
        }, []
    )

    React.useMemo(
        () => {
            const selectRoute = (el, coords) => {
                dispatch({type: SET_SELECTED_ROUTE, payload: el})
                dispatch({type:SET_SELECTED_TYPE, payload: 'route'});
                dispatch({type:SET_SIDEBAR_TYPE, payload: 'info'});
            }

            let array = routes.map(
                (el, index) =>
                    <li key={index} onClick={() => selectRoute(el)} className={style.elem}>
                        <h5>{el.title}</h5>
                        <span>{el.description}</span>
                    </li>
            );

            setRoutesDOM(array);
        }, [routes, dispatch]
    )

    return (
        <ul className={style.list}>
            {routesDOM}
        </ul>
    )
}

export default GSideBarRoutes;