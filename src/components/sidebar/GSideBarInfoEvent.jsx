import React from "react";
import {apiEvents} from "../../api/Events";

const GSideBarInfoEvent = (props) => {
    const [data, setData] = React.useState();

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
                </div>
            }

        </>
    )
}

export default GSideBarInfoEvent