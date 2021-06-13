import React from 'react'
import {apiAccount} from "../../api/Account";
import {apiFriendship} from "../../api/Friendship";
import {useSelector} from "react-redux";

const GAccountUsers = props => {
    const userId = useSelector(state => state.auth.userId);
    const [users, setUsers] = React.useState([]);
    const [usersDOM, setUsersDOM] = React.useState([]);

    function addFriend (id) {
        apiFriendship.addFriend(id)
            .then ( result => console.log(result));
    }

    React.useEffect(
        () => {
            apiAccount.getUsers()
                .then( result => setUsers(result) )
        }, []
    )
    React.useEffect(
        () => {
            let array = [];
            users.forEach(
                el => {
                    let user = null;
                    if (el.idUser !== userId) {
                        user =
                            <li key={el.idUser} className={'g-account-users__elem'}>
                                <div className={'g-account-users__elem-body'}>
                                    <span>Имя пользователя</span>
                                    <span>{el.username}</span>
                                </div>
                                <button className={'button'} onClick={() => addFriend(el.idUser)}>Добавить в друзья</button>
                            </li>
                        array.push(user);
                    }
                }
            )
            setUsersDOM(array)
        }, [users, userId]
    )
    return (
        <div className={'g-account-users'}>
            <ul className={'g-account-users__list'}>
                {usersDOM}
            </ul>
        </div>
    )
}

export default  GAccountUsers;