import React from 'react'
import {apiObjects} from "../../../../api/Objects";
import style from '../style.module.css';
import {GSwiper} from "../../../common/swiper";

const GAccountPageObjectFavs = props => {
    const [items, setItems] = React.useState([]);
    const [itemsDOM, setItemsDOM] = React.useState([]);

    React.useEffect(
        () => {
            let p = [];
            props.ids.forEach( el =>
                p.push(apiObjects.getInfoById(el))
            )
            Promise.all(p)
                .then( value => setItems(value));
        }, [props.ids]
    )

    React.useMemo(
        () => {
            let temp = [];
            items.forEach(el => {
                temp.push(
                    <div key={el.entityId} className={style['object-card']}>
                        <div>
                            {/*img*/}
                        </div>
                        <div>
                            <h5>{el.title}</h5>
                            <span>{el.previewDescription}</span>
                            <p>Рейтинг: {el.rating}</p>
                        </div>
                    </div>
                )
            })
            setItemsDOM(temp);
        }, [items]
    )

    return (
            <GSwiper array={itemsDOM} spv={2}/>
    )
}

export default GAccountPageObjectFavs;