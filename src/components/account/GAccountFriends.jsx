import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {SET_FRIENDS} from "../../store/reducers/friendsReducer";
import {Link} from "react-router-dom";

const GAccountFriends = props => {
    const friendsList = useSelector(state => state.friends.friends);
    const [friendsListDOM, setFriedsListDOM] = React.useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        let buff = [];
        friendsList.forEach((el) => {
            const element =
                <li key={el.id} className={"g-account-friends__li"}>
                    {el.name}
                    <div>
                        <Link to={`/account/messages/${el.id}`}>
                            <button>Написать</button>
                        </Link>
                        <button onClick={() => dispatch({type: SET_FRIENDS, payload: friendsList.filter(i => i.id !== el.id)})}>Удалить из друзей</button>
                    </div>
                </li>
            buff.push(element)
        })
        setFriedsListDOM(buff);
    }, [friendsList])

    return (
        <div className={"g-account-friends"}>
            <h3>Список друзей: </h3>
            <ul className={"g-account-friends__ul"}>
                {friendsListDOM}
            </ul>
        </div>
    )
}

export default GAccountFriends;