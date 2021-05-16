import React from 'react'

import '../../style/search/GSearch.css'

const GSearch = (props) => {
    return (
        <div className="g-search">
            <input className="g-search__input" placeholder="фестиваль"/>
            <div className="g-search__options" />
        </div>
    )
};

export default GSearch;