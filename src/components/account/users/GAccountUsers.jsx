import React from 'react'
import {apiAccount} from "../../../api/Account";
import {useSelector} from "react-redux";
import style from './style.module.css'
import GAccountUsersElem from "./GAccountUsersElem";

const GAccountUsers = props => {
    const userId = useSelector(state => state.auth.userId);
    const [users, setUsers] = React.useState([]);
    const [usersDOM, setUsersDOM] = React.useState([]);


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
                        user = <GAccountUsersElem el={el} key={el.idUser} />
                        array.push(user);
                    }
                }
            )
            setUsersDOM(array)
        }, [users, userId]
    )
    return (
        <div className={style.body}>
            <ul className={style.list}>
                {usersDOM}
            </ul>
        </div>
    )
}

export default  GAccountUsers;