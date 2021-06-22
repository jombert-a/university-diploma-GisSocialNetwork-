import React from 'react'
import GMap from "../map/GMap";
import {connect, useSelector} from "react-redux";
import {Switch, Route, useHistory, Redirect} from "react-router-dom";
import {getCoords, getLocation} from "../../store/reducers/globalReducer";
import GAccount from "../account/GAccount";
import GLogin from "../login/GLogin";
import GRegistration from "../login/GRegistration";
import GSideBarController from "../sidebar/GSideBarController";
import GHub from "../hub/GHub";

const GMain = (props) => {
    let history = useHistory();
    const isAuth = useSelector(state => state.auth.isAuth);


    React.useEffect(
        () => {
            history.push(`/${props.location.en}?lng=${props.coords.lng}&lat=${props.coords.lat}`);
        }, [props.coords.lng, props.coords.lat, props.location.en, history]
    )

    return (
        <main style={{height: '100%'}}>
            <Switch>
                <Route path="/registration">
                    <GRegistration />
                </Route>
                <Route path="/login">
                    <GLogin />
                </Route>
                <Route path="/account">
                    {isAuth ? <GAccount /> : <Redirect push to="/login" />}
                </Route>
                <Route path={`/`}>
                    <GMap />
                    <GSideBarController/>
                </Route>
            </Switch>
            <GHub />
        </main>
    )
}

const mapStateToProps = (state) => {
    const coords = getCoords(state)
    const location = getLocation(state)
    return { coords, location }
}

export default connect(mapStateToProps)(GMain);