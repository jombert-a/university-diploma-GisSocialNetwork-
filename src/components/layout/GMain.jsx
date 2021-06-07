import React from 'react'
import GMap from "../map/GMap";
import {connect, useSelector} from "react-redux";
import {Switch, Route, useHistory, Redirect} from "react-router-dom";
import {getCoords, getLocation} from "../../store/reducers/globalReducer";
import GSideBar from "../sidebar/GSideBar";
import GAccount from "../account/GAccount";
import GLogin from "../login/GLogin";
import GRegistration from "../login/GRegistration";

const GMain = (props) => {
    let history = useHistory();
    let isAuth = useSelector(state => state.auth.isAuth);
    React.useEffect(
        () => {
            history.push(`/${props.location.en}?lng=${props.coords.lng}&lat=${props.coords.lat}`);
        }, [props.coords.lng, props.coords.lat, props.location.en]
    )

    // const hubConnection = React.useMemo(() => , [isAuth])

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
                    {isAuth ? <GAccount /> : <Redirect to="/login" />}
                </Route>
                <Route path={`/`}>
                    <GMap />
                    <GSideBar/>
                </Route>
            </Switch>
        </main>
    )
}

const mapStateToProps = (state) => {
    const coords = getCoords(state)
    const location = getLocation(state)
    return { coords, location }
}

export default connect(mapStateToProps)(GMain);