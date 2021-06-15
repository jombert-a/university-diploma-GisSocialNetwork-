import React from 'react'
import {apiRoutes} from "../../api/Routes";
import {useDispatch} from "react-redux";
import {SET_SELECTED_ROUTE} from "../../store/reducers/routesReducer";

const GSideBarRoutes = props => {
    const [routes, setRoutes] = React.useState([]);
    const [routesDOM, setRoutesDOM] = React.useState([]);
    const dispatch = useDispatch();

    React.useEffect(
        () => {
            console.log('apiRoutes getRoutes');
            apiRoutes.getRoutes()
                .then(result => setRoutes(result))
            return function cleanup() {
                dispatch({type: SET_SELECTED_ROUTE, payload: []})
            }
        }, [dispatch]
    )

    React.useMemo(
        () => {
            const selectRoute = coords => {
                dispatch({type: SET_SELECTED_ROUTE, payload: coords})
            }

            let array = routes.map(
                (el, index) =>
                    <li key={index} onClick={() => selectRoute(el.way.coordinates)}>
                        <h5>{el.title}</h5>
                        <span>{el.description}</span>
                    </li>
            );

            setRoutesDOM(array);
        }, [routes, dispatch]
    )

    return (
        <ul>
            {routesDOM}
        </ul>
    )
}

export default GSideBarRoutes;