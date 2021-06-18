import React from 'react'
import style from './style.module.css'
import {useSelector} from "react-redux";

import gps from '../../../assets/svg/gps.svg'
import chat from '../../../assets/svg/chat.svg'
import friends from '../../../assets/svg/networking.svg'
import {Link} from "react-router-dom";


const Header = props => {
    const userId = useSelector(state => state.auth.userId);
    const location = useSelector(state => state.global.location);
    const lngCenter = useSelector(state => state.global.lngCenter);
    const latCenter = useSelector(state => state.global.latCenter);

    return (
        <header className={style.header}>
            <div className={style.logo}>
                MyTrip
            </div>
            <div className={style.body}>
                <Link to={`/${location.en}?lng=${lngCenter}&lat=${latCenter}`}>
                    <div className={style.icon}>
                        <img src={gps} alt={''} />
                    </div>
                </Link>
                <Link to="/account/messages">
                    <div className={style.icon}>
                        <img src={chat} alt={''} />
                    </div>
                </Link>
                <Link to="/account/friends">
                    <div className={style.icon}>
                        <img src={friends} alt={''} />
                    </div>
                </Link>
                <Link to="/account">
                    <div className={style.icon}>
                        <img src={`http://139.162.168.53:8989/api/UprofileImages/GetImgThumb/${userId}`} alt={'avatar'}/>
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default Header;