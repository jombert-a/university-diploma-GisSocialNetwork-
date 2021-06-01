import React from 'react'
import {useSelector} from "react-redux";

import GSideBarInfoObject from "./GSideBarInfoObject";
import GSideBarInfoEvent from "./GSideBarInfoEvent";
import '../../style/sidebar/GSideBarInfo.css'

const GSideBarInfoController = (props) => {
    const [buffer, setBuffer] = React.useState(<div />);
    const objectInfo = useSelector(state => state.mapObjects.selectedObject);
    const eventInfo = useSelector(state => state.events.selectedEvent);
    React.useEffect(() => {
        switch(props.type) {
            case 'object':
                setBuffer(<GSideBarInfoObject object={objectInfo} />);
                break;
            case 'event':
                setBuffer(<GSideBarInfoEvent event={eventInfo} />);
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