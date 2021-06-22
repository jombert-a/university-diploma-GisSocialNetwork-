import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {apiFriendship} from "../../api/Friendship";
import {SET_CHATS, SET_FRIEND_REQUESTS, SET_FRIENDS} from "../../store/reducers/accountReducer";
import {apiChatRooms} from "../../api/ChatRooms";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {SET_RECEIVED_MESSAGE} from "../../store/reducers/messageReducer";
import style from "./style.module.css";

const GHub = props => {
    const dispatch = useDispatch();

    const userId = useSelector(state => state.auth.userId);
    const username = useSelector(state => state.auth.username);
    const newMessage = useSelector(state => state.messages.newMessage);
    const [ connection, setConnection ] = React.useState(null);
    const [receivedMessage, setReceivedMessage] = React.useState({});
    /* for connection */

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
                        connection.on('Receive', function (message, userName, userId, chatId) {
                            dispatch({type: SET_RECEIVED_MESSAGE, payload: {message, userName, userId, chatId}});
                            setReceivedMessage({message, userName, userId, chatId});
                        });
                        connection.on("Notify", function (message) {
                            console.log(message);
                        });
                    })
            }
        }, [connection, username, dispatch]
    );

    React.useEffect(
        () => {
            if (Object.keys(newMessage).length > 0 && connection && connection.state === 'Connected')
                connection.invoke("Send", newMessage.message, newMessage.userName, newMessage.chatId);
        }, [newMessage, connection]
    )

    const [notify, setNotify] = React.useState(<></>)

    React.useEffect(
        () => {
            console.log(receivedMessage);
            if (receivedMessage?.userId !== userId)
                setNotify(
                    <div className={style.message}>
                        <h5>{receivedMessage.userName}</h5>
                        {receivedMessage.message}
                    </div>)
            // setTimeout(
            //     () => {
            //         setNotify(<></>)
            //     }, 5000
            // )
        }, [receivedMessage, userId]
    )

    return (
        <div className={'g-hub'}>
            {notify}
        </div>
    )
}

export default GHub;