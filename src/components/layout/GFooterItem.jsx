import React from 'react'

const GFooterItem = (props) => {
    return (
        <button className={`g-footer-item g-footer-item--${props.bg}`} onClick={props.onClick}/>
    )
};

export default GFooterItem;