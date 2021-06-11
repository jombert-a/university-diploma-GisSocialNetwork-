import React from 'react'

import '../../style/search/GSearch.css'
import {useSelector} from "react-redux";

const GSearch = (props) => {
    let city = useSelector(state => state.global.location.ru);
    let placeholder = city !== 'район' ? `Поиск в г. ${city}` : `Поиск`;
    return (
        <div className="g-search">
            <input className="g-search__input input" placeholder={placeholder}/>
        </div>
    )
};

export default GSearch;