import React from 'react'

import '../../style/layout/GFooter.css';
import GFooterItem from "./GFooterItem";

const GFooter = () => {
    const [isExtended, setIsExtended] = React.useState(false);
    const updateIsExtended = () => {
        setIsExtended(!isExtended);
    }
    return (
        <footer className={`g-footer ${isExtended ? 'g-footer--extended' : ''}`}>
            <div className="g-footer__row g-footer__row--extended">
                <GFooterItem bg="settings" />
                <GFooterItem bg="mark" />
                <GFooterItem bg="pulse" />
                <GFooterItem bg="heart" />
                <GFooterItem bg="magic"/>
            </div>
            <div className="g-footer__row">
                <GFooterItem bg="burger" />
                <GFooterItem bg="search" />
                <GFooterItem bg="plus" />
                <GFooterItem bg="route" />
                <GFooterItem bg="arrowUp" onClick={updateIsExtended}/>
            </div>
        </footer>
    )
};

export  default GFooter