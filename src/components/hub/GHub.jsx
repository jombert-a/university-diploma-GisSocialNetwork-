import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {apiFriendship} from "../../api/Friendship";
import {SET_CHATS, SET_FRIEND_REQUESTS, SET_FRIENDS} from "../../store/reducers/accountReducer";
import {apiChatRooms} from "../../api/ChatRooms";
import {HubConnectionBuilder} from "@microsoft/signalr";

const GHub = props => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);
    const username = useSelector(state => state.auth.username);

    const [ connection, setConnection ] = React.useState(null);

    /* for connection */
    const newMessage = useSelector(state => state.account.newMessage);

    React.useEffect(
        () => {
            if (userId !== null) {
                apiFriendship.getFriends(userId)
                    .then(result => {
                        dispatch({type: SET_FRIENDS, payload: result});
                    })
                apiFriendship.getFriendRequests(userId)
                    .then(result => {
                        dispatch({type: SET_FRIEND_REQUESTS, payload: result})
                    })
                apiChatRooms.getUserChatRooms()
                    .then( result => {
                        dispatch({type: SET_CHATS, payload: result});
                    } );
                // setInterval(
                //     () => {
                //         apiFriendship.getFriendRequests(userId)
                //             .then(result => {
                //                 dispatch({type: SET_FRIEND_REQUESTS, payload: result})
                //             })
                //     }, 30000
                // )
                const token = sessionStorage.getItem('token');
                const hubConnection = new HubConnectionBuilder()
                    .withUrl("http://139.162.168.53:8989/chat", { accessTokenFactory: () => token })
                    .build();
                setConnection(hubConnection);
            }
        }, [userId, dispatch]
    )

    React.useEffect(
        () => {
            if (connection && connection.state !== 'Connected' && username) {
                connection.start()
                    .then(result => {
                        connection.invoke('Enter', username);
                        connection.on('Receive', function (message, userName) {
                            console.log(message);
                        });
                        connection.on("Notify", function (message) {
                            console.log(message);
                        });
                    })
            }
        }, [connection, username]
    );

    React.useEffect(
        () => {
            if (Object.keys(newMessage).length > 0 && connection && connection.state === 'Connected')
                connection.invoke("Send", newMessage.message, newMessage.userName, newMessage.chatId);
        }, [newMessage, connection]
    )

    return (
        <></>
    )
}

export default GHub;