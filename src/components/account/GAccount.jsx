import React from 'react'
import GAccountNav from "./GAccountNav";
import {Switch, Route} from "react-router-dom";
import GAccountPage from "./GAccountPage";
import '../../style/account/account.css'
import GAccountFriends from "./GAccountFriends";
import GAccountMessages from "./GAccountMessages";
import GAccountUsers from "./GAccountUsers";
import {apiChatRooms} from "../../api/ChatRooms";
import {apiFriendship} from "../../api/Friendship";
import {SET_CHATS, SET_FRIEND_REQUESTS, SET_FRIENDS} from "../../store/reducers/accountReducer";
import {useDispatch, useSelector} from "react-redux";
import GAccountRequests from "./GAccountRequests";

import { HubConnectionBuilder } from '@microsoft/signalr';

const GAccount = (props) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);
    const username = useSelector(state => state.auth.username);

    const [ connection, setConnection ] = React.useState(null);

    /* for connection */
    const newMessage = useSelector(state => state.account.newMessage);
    console.log(connection)

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
                setInterval(
                    () => {
                        apiFriendship.getFriendRequests(userId)
                            .then(result => {
                                dispatch({type: SET_FRIEND_REQUESTS, payload: result})
                            })
                    }, 30000
                )
                const token = sessionStorage.getItem('token');
                const hubConnection = new HubConnectionBuilder()
                    .withUrl("http://139.162.168.53:8989/chat", { accessTokenFactory: () => token })
                    .build();
                hubConnection.on('Receive', function (message, userName) {
                    console.log(message);
                });
                hubConnection.on("Notify", function (message) {

                    console.log(message);
                });
                setConnection(hubConnection);
            }
        }, [userId]
    )

    React.useEffect(
        () => {
            if (connection) {
                // connection.on('Receive', message => {
                //     console.log(message);
                // });
                connection.start()
                    .then(result => {
                        console.log('Connected!');
                        connection.invoke('Enter', username);
                    })
                //     .catch(e => console.log('Connection failed: ', e));
            }
        }, [connection]
    );

    React.useEffect(
        () => {
            if (newMessage !== null && connection)
                connection.invoke("Send", newMessage.message, newMessage.userName, newMessage.chatId);
        }, [newMessage]
    )

    return (
        <div className="g-account">
            <GAccountNav />
            <div className={"g-account__inner"}>
                <Switch>
                    <Route path="/account/requests">
                        <GAccountRequests />
                    </Route>
                    <Route path="/account/users">
                        <GAccountUsers />
                    </Route>
                    <Route path="/account/friends">
                        <GAccountFriends />
                    </Route>
                    <Route path="/account/messages">
                        <GAccountMessages />
                    </Route>
                    <Route path="/account">
                        <GAccountPage />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default GAccount;