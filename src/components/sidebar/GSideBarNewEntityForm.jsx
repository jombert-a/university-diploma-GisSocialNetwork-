import React from 'react'
import GSideBarNewObjectForm from "./Modules/GSideBarNewObjectForm";



const GSideBarNewEntityForm = props => {
    function typeController (type) {
        switch (type) {
            case 'object':
                return <GSideBarNewObjectForm lng={props.lng} lat={props.lat} typeId={1} />
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