import React from 'react'
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {apiChatRooms} from "../../api/ChatRooms";

const GAccountFriends = props => {
    const friendsList = useSelector(state => state.account.friends);
    const chatList = useSelector(state => state.account.chats)
    const friendsRequests = useSelector(state => state.account.friendRequests);
    const [friendsListDOM, setFriendsListDOM] = React.useState([]);

    const requests = React.useMemo(
        () => {
            return (
                    friendsRequests.length > 0 ? <Link to={'/account/requests'}>Новые заявки: {friendsRequests.length}</Link> : <></>
            )
        }, [friendsRequests.length]
    )

    React.useEffect(() => {
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
        let buff = [];
        friendsList.forEach((el) => {
            const element =
                <li key={el.idUser} className={"g-account-friends__li"}>
                    <Link to={`/account/${el.idUser}`}>
                        {el.username}
                        <button className={'button'} onClick={() => writeMessage(el.idUser, el.username)}>Написать</button>
                    </Link>
                </li>
            buff.push(element)
        })
        setFriendsListDOM(buff);
    }, [friendsList, chatList])

    return (
        <div className={"g-account-friends"}>
            {requests}
            <h4>Список друзей: </h4>
            {
                friendsListDOM.length >= 1 ?
                    <ul className={"g-account-friends__ul"}>
                        {friendsListDOM}
                    </ul> :
                    <span>Пока что у вас нет друзей</span>
            }

        </div>
    )
}

export default GAccountFriends;