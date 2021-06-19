import React from 'react'
import {apiFriendship} from "../../../api/Friendship";
import {useSelector} from "react-redux";
import style from './style.module.css'

const GAccountUsersElem = props => {
    const friendsId = useSelector(state => state.account.friendsId);

    function addFriend (id) {
        apiFriendship.addFriend(id)
            .then ( result => console.log(result));
    }

    function deleteFriend (id) {
        apiFriendship.deleteFriend(id)
            .then (result => console.log(result));
    }

    return (
        <li className={style.elem}>
            <div className={style.inner}>
                <span>Имя пользователя</span>
                <span>{props.el.username}</span>
            </div>
            {
                friendsId.includes(props.el.idUser) ?
                    <button className={'button'} onClick={() => deleteFriend(props.el.idUser)}>Удалить из друзей</button> :
                    <button className={'button'} onClick={() => addFriend(props.el.idUser)}>Добавить в друзья</button>
            }
        </li>
    )
}

export default GAccountUsersElem