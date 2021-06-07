import React from 'react'
import GAccountNav from "./GAccountNav";
import {Switch, Route} from "react-router-dom";
import GAccountPage from "./GAccountPage";
import '../../style/account/account.css'
import GAccountFriends from "./GAccountFriends";
import GAccountMessages from "./GAccountMessages";
import GAccountUsers from "./GAccountUsers";
import {apiFriendship} from "../../api";
import {SET_FRIEND_REQUESTS, SET_FRIENDS} from "../../store/reducers/accountReducer";
import {useDispatch, useSelector} from "react-redux";
import GAccountRequests from "./GAccountRequests";

const GAccount = (props) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);

    React.useEffect(
        () => {
            if (userId !== null) {
                apiFriendship.getFriends(userId)
                    .then(result => {
                        dispatch({type: SET_FRIENDS, payload: result});
                    })
                apiFriendship.getFriendRequests(userId)
                    .then(result => {
                        console.log(result)
                        dispatch({type: SET_FRIEND_REQUESTS, payload: result})
                    })
                setInterval(
                    () => {
                        apiFriendship.getFriendRequests(userId)
                            .then(result => {
                                console.log(result)
                                dispatch({type: SET_FRIEND_REQUESTS, payload: result})
                            })
                    }, 30000
                )
            }
        }, [userId]
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