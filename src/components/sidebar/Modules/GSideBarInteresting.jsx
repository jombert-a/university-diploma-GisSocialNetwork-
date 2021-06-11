import React from 'react'
import {SET_SELECTED_EVENT} from "../../../store/reducers/eventsReducer";
import {FLY_TO, SET_SELECTED_TYPE} from "../../../store/reducers/globalReducer";
import {useDispatch} from "react-redux";
import {GSwiper} from "../../common/swiper";
import '../../../style/sidebar/interesting-card.css';

const GSideBarInteresting = props => {
    const dispatch = useDispatch();
    const [eventsDOM, setEventsDOM] = React.useState([]);

    React.useEffect(() => {
        if (props.events) {
            let array = [];
            props.events.forEach(el => {
                console.log(el);
                const event =
                    <div className={`g-side-bar__interesting interesting-card`}
                         onClick={() => {
                             dispatch({type:SET_SELECTED_EVENT, payload: el});
                             dispatch({type:SET_SELECTED_TYPE, payload: 'event'});
                             dispatch({type: FLY_TO, payload: {lat: el.way.coordinates[0], lng: el.way.coordinates[1]}});
                         }}>
                        <div className={'interesting-card__img'}>
                            <img src={require('../../../assets/content/Image.png').default} alt={'Картинка'}/>
                        </div>
                        <h5>{el.title}</h5>
                        <p>{el.category.categoryName}</p>
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