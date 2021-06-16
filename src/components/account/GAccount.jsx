import React from 'react'
import GAccountNav from "./GAccountNav";
import {Switch, Route} from "react-router-dom";
import GAccountPage from "./GAccountPage";
import '../../style/account/account.css'
import GAccountFriends from "./GAccountFriends";
import GAccountMessages from "./GAccountMessages";
import GAccountUsers from "./GAccountUsers";
import GAccountRequests from "./GAccountRequests";


const GAccount = (props) => {
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