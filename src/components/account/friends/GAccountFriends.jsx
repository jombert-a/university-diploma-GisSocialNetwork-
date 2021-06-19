import React from 'react'
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import style from './style.module.css'
import GAccountFriendsElem from "./GAccountFriendsElem";

const GAccountFriends = props => {
    const friendsList = useSelector(state => state.account.friends);
    const friendsRequests = useSelector(state => state.account.friendRequests);
    const [friendsListDOM, setFriendsListDOM] = React.useState([]);

    const requests = React.useMemo(
        () => {
            return (
                    friendsRequests.length > 0 ?
                        <Link to={'/account/requests'} className={style.requests}>Новые заявки: {friendsRequests.length}</Link> :
                        <span className={style.requests}>Заявок на добавления нет</span>
            )
        }, [friendsRequests.length]
    )

    React.useEffect(() => {
        let buff = [];
        friendsList.forEach((el) => {
            const element = <GAccountFriendsElem el={el} key={el.idUser}/>
            buff.push(element)
        })
        setFriendsListDOM(buff);
    }, [friendsList])

    return (
        <div className={style.body}>
            {requests}
            <p>
                Если ищите кого-то, <Link to={'/account/users'}>воспользуйтесь списком пользователей</Link>
            </p>
            <h4>Список друзей: </h4>
            {
                friendsListDOM.length >= 1 ?
                    <ul className={style.list}>
                        {friendsListDOM}
                    </ul> :
                    <span>Пока что у вас нет друзей</span>
            }

        </div>
    )
}

export default GAccountFriends;