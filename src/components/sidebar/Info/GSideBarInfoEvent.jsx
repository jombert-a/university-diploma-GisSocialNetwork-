import React from "react";
import {apiEvents} from "../../../api/Events";
import {apiFavourites} from "../../../api/Favourites";
import {useSelector} from "react-redux";

const GSideBarInfoEvent = (props) => {
    const [data, setData] = React.useState();
    const isAuth = useSelector(state => state.auth.isAuth);

    React.useEffect( () => {
        apiEvents.getEventById(props.event.idEntity)
            .then( response => setData(response));
    }, [props.event.idEntity])

    console.log(data);

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