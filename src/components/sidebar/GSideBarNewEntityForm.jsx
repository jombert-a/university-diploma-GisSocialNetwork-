import React from 'react'
import GSideBarNewObjectForm from "./Modules/GSideBarNewObjectForm";
import GSideBarNewRouteForm from "./Modules/GSideBarNewRouteForm";
import GSideBarNewPlaceForm from "./Modules/GSideBarNewPlaceForm";



const GSideBarNewEntityForm = props => {
    function typeController (type) {
        switch (type) {
            case 'object':
                return <GSideBarNewObjectForm lng={props.lng} lat={props.lat} typeId={1} />
            case 'place':
                return <GSideBarNewPlaceForm lng={props.lng} lat={props.lat} typeId={2} />
            case 'route':
                return <GSideBarNewRouteForm typeId={4} />
            default:
                return <GSideBarNewObjectForm />
        }
    }
    return (
        <div>
            {typeController(props.type)}
        </div>
    )
}

export default GSideBarNewEntityForm;