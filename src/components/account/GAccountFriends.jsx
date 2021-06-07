import React from 'react'
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const GAccountFriends = props => {
    const friendsList = useSelector(state => state.account.friends);
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
        let buff = [];
        console.log('list')
        friendsList.forEach((el) => {
            const element =
                <li key={el.id} className={"g-account-friends__li"}>
                    {el.name}
                    {/*<div>*/}
                    {/*    <Link to={`/account/messages/${el.id}`}>*/}
                    {/*        <button>Написать</button>*/}
                    {/*    </Link>*/}
                    {/*    <button onClick={() => dispatch({type: SET_FRIENDS, payload: friendsList.filter(i => i.id !== el.id)})}>Удалить из друзей</button>*/}
                    {/*</div>*/}
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