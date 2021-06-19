import React from 'react'
import {Switch, Route} from "react-router-dom";
import GAccountPage from "./page/GAccountPage";
import '../../style/account/account.css'
import GAccountFriends from "./friends/GAccountFriends";
import GAccountMessages from "./messages/GAccountMessages";
import GAccountUsers from "./users/GAccountUsers";
import GAccountRequests from "./GAccountRequests";
import GAccountHeader from "./header/GAccountHeader";


const GAccount = (props) => {
    return (
        <div className="g-account">
            <GAccountHeader />
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
                        <Route path="/account/:id?">
                            <GAccountPage />
                        </Route>
                    </Switch>
                </div>
        </div>
    )
}

export default GAccount;