import React from 'react'

import '../../style/search/GSearch.css'
import Icons from "../common/icons";

const GSearch = (props) => {
    return (
        <div className="g-search">
            <input className="g-search__input" placeholder="фестиваль"/>
            <Icons
                name='documents-outline'
                color='#fff'
                size='32'
                className='button-left-panel'
            />
            <div className="g-search__options" />
        </div>
    )
};

export default GSearch;