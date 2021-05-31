import React from 'react'
import '../../style/layout/GSideBar.css';
import Icons from "../common/icons";
import GSearch from "../search/GSearch";
import {connect, useDispatch, useSelector} from "react-redux";
import {GSwiper} from "../common/swiper";
import GSideBarInfo from "./GSideBarInfo";
import {setSelectedObject} from "../../store/reducers/mapObjectsReducer";
import {ADD_TYPE, DELETE_TYPE} from "../../store/reducers/globalReducer";


const GSideBar = (props) => {
    let [hidden, setHidden] = React.useState(false);
    let types = useSelector(state => state.global.types);
    const location = useSelector(state => state.global.location);
    const placeholder = location !== 'area' ? `${location}` : `Район`;
    const interestingArray = [
        <div className={`g-side-bar__interesting`}>1</div>,
        <div className={`g-side-bar__interesting`}>2</div>,
        <div className={`g-side-bar__interesting`}>3</div>,
        <div className={`g-side-bar__interesting`}>4</div>
    ];
    const selectedObject = useSelector(state => state.mapObjects.selectedObject);
    const dispatch = useDispatch();

    function typesHandler(type) {
        if (types.includes(type)) {
            deleteTypeHandler(type)
        }
        else {
            addTypeHandler(type);
        }
    }

    function deleteTypeHandler(type) {
        dispatch({type: DELETE_TYPE, payload: type});
        dispatch({type: `SET_${type.toUpperCase()}`, payload: []});
    }

    function  addTypeHandler(type) {
        dispatch({type: ADD_TYPE, payload: type});
    }

    React.useEffect(
        () => {
            if (selectedObject) setHidden(false);
        }, [selectedObject]
    )

    return (
        <div className={`g-side-bar`}>
            <div className={`g-side-bar__inner ${hidden ? 'g-side-bar__inner--hidden' : ''}`}>
                {selectedObject && <GSideBarInfo object={selectedObject}/>}
                <div className={`g-side-bar__header`}>
                    <GSearch />
                    <h3>{placeholder}</h3>
                </div>
                <div className={`g-side-bar__body`}>
                    <h4> Навигация </h4>
                    <ul className={`g-side-bar__nav`}>
                        <li className={`g-side-bar__nav-link ${types.includes('events') ? 'active' : ''}`}
                            onClick={() => typesHandler('events')}> Cобытия </li>
                        <li className={`g-side-bar__nav-link ${types.includes('objects') ? 'active' : ''}`}
                            onClick={() => typesHandler('objects')}> Объекты </li>
                        <li className={`g-side-bar__nav-link`}> Места   </li>
                        <li className={`g-side-bar__nav-link`}> Машруты </li>
                    </ul>
                    <h4> Интересное рядом </h4>
                    <GSwiper array={interestingArray}/>
                    <h4> Категории </h4>
                    <ul className={`g-side-bar__categories`}>
                        <li className={`g-side-bar__category`}>
                            <div className={`g-side-bar__category-icon`} />
                            Аптеки
                        </li>
                        <li className={`g-side-bar__category`}>
                            <div className={`g-side-bar__category-icon`} />
                            Автосервисы
                        </li>
                        <li className={`g-side-bar__category`}>
                            <div className={`g-side-bar__category-icon`} />
                            Продукты
                        </li>
                        <li className={`g-side-bar__category`}>
                            <div className={`g-side-bar__category-icon`} />
                            Поесть
                        </li>
                        <li className={`g-side-bar__category`}>
                            <div className={`g-side-bar__category-icon`} />
                            Парки
                        </li>
                        <li className={`g-side-bar__category`}>
                            <div className={`g-side-bar__category-icon`} />
                            Красота
                        </li>
                        <li className={`g-side-bar__category`}>
                            <div className={`g-side-bar__category-icon`} />
                            Спорт
                        </li>
                        <li className={`g-side-bar__category`}>
                            <div className={`g-side-bar__category-icon`} />
                            Избранное
                        </li>
                    </ul>
                    <div className={`g-side-bar__magic`}>Подобрать для меня</div>
                </div>
            </div>
            <div  className={`g-side-bar__hide-btn ${hidden ? 'g-side-bar__hide-btn--active' : ''} ${selectedObject ? 'g-side-bar__hide-btn--down' : ''}`}
                  onClick={() => setHidden(!hidden)}>
                <Icons
                    name='arrow'
                    color='#000'
                    size='32'
                    className=''
                />
            </div>
            {
                selectedObject &&
                <div className={`g-side-bar__hide-btn`}
                     onClick={() => props.setSelectedObject(null)}>
                    <Icons
                        name='close'
                        color='#000'
                        size='32'
                        className=''
                    />
                </div>
            }
        </div>
    )
}

export default connect(
    null,
    { setSelectedObject }
) (GSideBar);
