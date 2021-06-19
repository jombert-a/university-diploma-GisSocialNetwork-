import React from 'react'
import style from "./style.module.css";
import {Link} from "react-router-dom";
import {apiChatRooms} from "../../../api/ChatRooms";
import {useSelector} from "react-redux";
import {apiFriendship} from "../../../api/Friendship";

const GAccountFriendsElem = props => {
    const chatList = useSelector(state => state.account.chats)

    function writeMessage(id, name) {
        let flag = false;
        chatList.forEach(el => {
            el.chatUsers.forEach(elem => {
                if (id === elem.userId) {
                    flag = true;
                }
            })
        })
        if (!flag) {
            apiChatRooms.createPersonalChat({name, id})
                .then ( result => console.log(result) );
        }
    }

    function deleteFriend (id) {
        apiFriendship.deleteFriend(id)
            .then (result => console.log(result));
    }

    return (
        <li key={props.el.idUser} className={style.elem}>
            <Link to={`/account/${props.el.idUser}`}>
                {props.el.username}
                <button className={'button'} onClick={() => writeMessage(props.el.idUser, props.el.username)}>Написать</button>
                <button className={'button'} onClick={() => deleteFriend(props.el.idUser)}>Удалить из друзей</button>
            </Link>
        </li>
    )
}

export default GAccountFriendsElem;