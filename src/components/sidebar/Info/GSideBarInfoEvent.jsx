import React from "react";
import {apiEvents} from "../../../api/Events";
import {apiFavourites} from "../../../api/Favourites";
import {useDispatch, useSelector} from "react-redux";
import {FLY_TO} from "../../../store/reducers/globalReducer";

const GSideBarInfoEvent = (props) => {
    const [data, setData] = React.useState();
    const isAuth = useSelector(state => state.auth.isAuth);
    const dispatch = useDispatch()

    React.useEffect( () => {
        apiEvents.getEventById(props.event.idEntity)
            .then( response => setData(response));
    }, [props.event.idEntity])

    React.useEffect(() => {
        return function cleanup() {
            dispatch({type: FLY_TO, payload: {lat: null, lng: null}});
        }
    }, [dispatch])

    return (
        <>
            {
                data &&
                <div>
                    <h3>Событие</h3>
                    <h4>{data.category.categoryName} | {data.category.categoryClassifier.classifierName}</h4>
                    <p>{data.previewDescription}</p>
                    <p>Рейтинг: {data.rating}</p>
                    <p>Дата: {data.date}</p>
                    <p>Продолжительность: {data.duration}</p>
                    {
                        isAuth &&
                        <button className={'button'} onClick={() => apiFavourites.addToFavourites(data)}>Добавить в избранное</button>
                    }
                </div>
            }

        </>
    )
}

export default GSideBarInfoEvent