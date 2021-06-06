import React from 'react'
import {SET_SELECTED_EVENT} from "../../../store/reducers/eventsReducer";
import {FLY_TO, SET_SELECTED_TYPE} from "../../../store/reducers/globalReducer";
import {useDispatch} from "react-redux";
import {GSwiper} from "../../common/swiper";

const GSideBarInteresting = props => {
    const dispatch = useDispatch();
    const [eventsDOM, setEventsDOM] = React.useState([]);

    React.useEffect(() => {
        if (props.events) {
            let array = [];
            props.events.forEach(el => {
                const event =
                    <div className={`g-side-bar__interesting`}
                         onClick={() => {
                             dispatch({type:SET_SELECTED_EVENT, payload: el});
                             dispatch({type:SET_SELECTED_TYPE, payload: 'event'});
                             dispatch({type: FLY_TO, payload: {lat: el.way.coordinates[0], lng: el.way.coordinates[1]}});
                         }}>
                        {el.title}
                    </div>
                array.push(event);
            })
            setEventsDOM(array);
        }
    }, [props.events, dispatch]);
    return (
        <GSwiper array={eventsDOM} />
    )
}

export default GSideBarInteresting;