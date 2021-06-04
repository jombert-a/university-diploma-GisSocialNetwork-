import React from 'react'
import {Link} from "react-router-dom";
import '../../style/account/account.css'
import {useSelector} from "react-redux";

const GAccountNav = (props) => {
    const location = useSelector(state => state.global.location);
    const lngCenter = useSelector(state => state.global.lngCenter);
    const latCenter = useSelector(state => state.global.latCenter);
    return (
        <div className="g-account-nav">
            <Link to="/account">Моя страница</Link>
            <Link to="/account/friends">Мои друзья</Link>
            <Link to="/account/messages">Мои сообщения</Link>
            <Link to={`/${location.en}?lng=${lngCenter}&lat=${latCenter}`}>Карта ({location.ru})</Link>
        </div>
    )
}

export default GAccountNav