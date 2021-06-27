import React from 'react'
import {useSelector} from "react-redux";
import {apiFriendship} from "../../api/Friendship";

const GAccountRequests = props => {
    const requests = useSelector(state => state.account.friendRequests);
    const [requestsDOM, setRequestsDOM] = React.useState([]);

    function acceptFriendship(el, status) {
        apiFriendship.editFriendship({id: el.idFriendship, status: status})
            .then ( result => console.log(result) );
    }

    React.useMemo(
        () => {
            let array = [];
            requests.forEach(
                el => {
                    const request =
                        <li key={el.idUser} className={'g-account-requests__elem'}>
                            <div>
                                <p>{el.username}</p>
                                <p>{el.createdTime.split('T')[0]}</p>
                                <p>{el.createdTime.split('T')[1]}</p>
                            </div>
                            <button className={'button'} onClick={() => acceptFriendship(el, 2)}>Принять</button>
                            <button className={'button'}>Отклонить</button>
                        </li>
                    array.push(request);
                }
            );
            setRequestsDOM(array);
        }, [requests]
    )

    return (
        <div className={'g-account-requests'}>
            <ul className={'g-account-requests__list'}>
                {requestsDOM}
            </ul>
        </div>
    )
}

export default GAccountRequests;