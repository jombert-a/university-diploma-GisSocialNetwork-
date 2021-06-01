import React from 'react'
import GMap from "../map/GMap";
import {connect} from "react-redux";
import {Switch, Route, useHistory} from "react-router-dom";
import {getCoords, getLocation} from "../../store/reducers/globalReducer";
import GSideBar from "../sidebar/GSideBar";
import GAccount from "../account/GAccount";

const GMain = (props) => {
    let history = useHistory();
     React.useEffect(
        () => {
            history.push(`/${props.location.en}?lng=${props.coords.lng}&lat=${props.coords.lat}`);
        }
    )

    return (
        <main>
            <Switch>
                <Route path="/account">
                    <GAccount />
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