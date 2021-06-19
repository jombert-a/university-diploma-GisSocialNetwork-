import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {SET_SELECTED_ROUTE} from "../../../store/reducers/routesReducer";
import {apiFavourites} from "../../../api/Favourites";

const GSideBarInfoRoute = props => {
    console.log(props);
    const [routePoints, setRoutesPoints] = React.useState([]);

    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch()
    const defaultState = {
        way: {
            coordinates: []
        }
    }

    React.useEffect(
        () => {
            return function cleanup() {
                dispatch({type: SET_SELECTED_ROUTE, payload: defaultState})
            }
            // eslint-disable-next-line
        }, []
    )

    React.useEffect(
        () => {
            let buff = [];
            props.route.way.coordinates.forEach(
                el => buff.push(<li>{`${el[0]}   ${el[1]}`}</li>)
            )
            setRoutesPoints(buff);
        }, [props.route.way.coordinates]
    )

    return (
        <div>
            <h4>{props.route.title}</h4>
            <p>{props.route.description}</p>
            <h5>Маршрут:</h5>
            {
                isAuth &&
                <button className={'button'} onClick={() => apiFavourites.addToFavourites(props.route)}>Добавить в избранное</button>
            }
            <ul>
                {routePoints}
            </ul>
            {/*<p>Телефон: {data.phone}</p>*/}
            {/*<p>Категория: {data.category.categoryName}</p>*/}
        </div>
    )
}

export default GSideBarInfoRoute;