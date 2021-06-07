import React from 'react'
import {apiChatRooms} from "../../api";


const GAccountMessages = props => {

    React.useEffect(
        () => {
            apiChatRooms.getUserChatRooms()
                .then( result => console.log(result) );
        }
    )

    return (
        <div>
            <h3>Мои диалоги</h3>

        </div>
    )
}

export default GAccountMessages;