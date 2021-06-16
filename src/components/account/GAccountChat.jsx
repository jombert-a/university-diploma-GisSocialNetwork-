import React from 'react'
import {apiMessages} from "../../api/Messages";
import {useDispatch, useSelector} from "react-redux";
import {SET_MESSAGES, SET_NEW_MESSAGE} from "../../store/reducers/accountReducer";
import {ADD_TO_MESSAGES, SET_OPENED_CHAT} from "../../store/reducers/messageReducer";

const GAccountChat = props => {
    const [messagesDOM, setMessagesDOM] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState('');
    const userId = useSelector(state => state.auth.userId);
    const userName = useSelector(state => state.auth.username);
    const messages = useSelector(state => state.messages.messages);
    const dispatch = useDispatch();

    function newMessageHandler(messages) {
        dispatch({type: SET_NEW_MESSAGE, payload: {chatId: props.id, message: newMessage, userName}});
        setNewMessage('');
    }

    const receivedMessage = useSelector(state => state.messages.receivedMessage);

    React.useEffect(
        () => {
            if (receivedMessage && receivedMessage.chatId && receivedMessage.chatId === props.id) {
                console.log('received message', receivedMessage.message);
                apiMessages.getMessages(props.id)
                    .then(result => {
                        dispatch({type: SET_MESSAGES, payload: result})
                    });            }
            // eslint-disable-next-line
        }, [receivedMessage, dispatch]
    )

    React.useEffect(
        () => {
            dispatch({type: SET_OPENED_CHAT, payload: props.id})
            apiMessages.getMessages(props.id)
                .then(result => {
                    dispatch({type: SET_MESSAGES, payload: result})
                });
            return function cleanup () {
                dispatch({type: SET_OPENED_CHAT, payload: null})
            }
        }, [props.id, dispatch]
    )

    React.useMemo(
        () => {
            if (messages.length > 0) {
                let array = [];
                messages.filter(el=>el.chatId === props.id).forEach((el, index) => {
                    const message =
                        <p key={index} className={`g-account-messages__el ${el.userId === userId ? 'g-account-messages__el--end' : ''}`}>{el.messageText}</p>
                    array.push(message);
                })
                setMessagesDOM(array);
            }
        }, [messages, userId, props.id]
    )


    return (
        <div>
            <div className={"g-account-messages__chat"}>
                {messagesDOM}
            </div>
            <div className={"g-account-messages__input"}>
                <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
                <button onClick={() => newMessageHandler(messages)}>Отправить</button>
            </div>
        </div>
    )
}

export default GAccountChat;