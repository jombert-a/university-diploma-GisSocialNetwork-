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

    React.useEffect(() => {
        let buff = [];
        friendsList.forEach((el) => {
            const element =
                <li key={el.idUser} className={"g-account-friends__li"}>
                    {el.username}
                    <button className={'button'} onClick={() => writeMessage(el.idUser, el.username)}>Написать</button>
                </li>
            buff.push(element)
        })
        setFriendsListDOM(buff);
    }, [friendsList])

    return (
        <div className={"g-account-friends"}>
            {requests}
            <h3>Список друзей: </h3>
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