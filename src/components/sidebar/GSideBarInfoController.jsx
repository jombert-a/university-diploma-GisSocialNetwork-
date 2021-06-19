import React from 'react'
import {useSelector} from "react-redux";

import GSideBarInfoObject from "./Info/GSideBarInfoObject";
import GSideBarInfoEvent from "./Info/GSideBarInfoEvent";
import '../../style/sidebar/GSideBarInfo.css'
import GSideBarInfoPlace from "./Info/GSideBarInfoPlace";
import GSideBarInfoRoute from "./Info/GSideBarInfoRoute";

const GSideBarInfoController = (props) => {
    const [buffer, setBuffer] = React.useState(<div />);
    const objectInfo = useSelector(state => state.mapObjects.selectedObject);
    const eventInfo = useSelector(state => state.events.selectedEvent);
    const placeInfo = useSelector(state => state.places.selectedPlace);
    const routeInfo = useSelector(state => state.routes.selectedRoute);
    const selectedType = useSelector(state => state.global.selectedEntityType);
    React.useEffect(() => {
        switch(selectedType) {
            case 'object':
                setBuffer(<GSideBarInfoObject object={objectInfo} />);
                break;
            case 'event':
                setBuffer(<GSideBarInfoEvent event={eventInfo} />);
                break;
            case 'place':
                setBuffer(<GSideBarInfoPlace place={placeInfo} />)
                break;
            case 'route':
                setBuffer(<GSideBarInfoRoute route={routeInfo} />)
                break;
            default:
                setBuffer(<div>default</div>);
        }
        console.log(buffer);
        //eslint-disable-next-line
    }, [props.type, objectInfo, eventInfo])
    return (
        <div className={`g-side-bar-info`}>
            {buffer}
        </div>
    )
}

export default  GSideBarInfoController;