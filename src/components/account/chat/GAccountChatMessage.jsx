import React from 'react'

import style from './style.module.css'

const GAccountChatMessage = props => {
    return (
        <p className={`${style.message} ${props.el.userId === props.id ? style['message--end'] : ''}`}>{props.el.messageText}</p>
    )
}

export default GAccountChatMessage