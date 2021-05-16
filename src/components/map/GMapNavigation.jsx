import React from 'react';

const GMapNavigation = props => {
    return (
        <div className="g-map-navigation">
            <button className="g-map-navigation__btn g-map-navigation__btn--plus" onClick={() => props.setZoom(1)}/>
            <button className="g-map-navigation__btn g-map-navigation__btn--minus" onClick={() => props.setZoom(-1)}/>
            <button className="g-map-navigation__btn g-map-navigation__btn--location" />
        </div>
    )
};

export  default GMapNavigation;