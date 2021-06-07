import React from 'react'
import {apiMessages} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import {SET_MESSAGES, SET_NEW_MESSAGE} from "../../store/reducers/accountReducer";

const GAccountChat = props => {
    const [messagesDOM, setMessagesDOM] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState('');
    const userId = useSelector(state => state.auth.userId);
    const userName = useSelector(state => state.auth.username);
    const messages = useSelector(state => state.account.messages);
    const dispatch = useDispatch();

    function newMessageHandler(messages) {
        dispatch({type: SET_NEW_MESSAGE, payload: {chatId: props.id, message: newMessage, userName}});
        apiMessages.getMessages(props.id)
            .then(result => {
                dispatch({type: SET_MESSAGES, payload: {messages: result, id: props.id}})
            })
        setNewMessage('');
    }

    React.useEffect(
        () => {
            apiMessages.getMessages(props.id)
                .then(result => {
                    dispatch({type: SET_MESSAGES, payload: {messages: result, id: props.id}})
                })
        }, [props.id]
    )

    React.useMemo(
        () => {
            let array = [];
            console.log(messages);
            messages.filter(el=>el.chatId === props.id).forEach(el => {
                const message =
                    <p key={el.idMessage} className={`g-account-messages__el ${el.userId === userId ? 'g-account-messages__el--end' : ''}`}>{el.messageText}</p>
                array.push(message);
            })
            setMessagesDOM(array);
        }, [messages, userId]
    )

    return (
        <div>
            <div className={"g-account-messages__chat"}>
                {messagesDOM}
                <div className={"g-account-messages__input"}>
                    <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
                    <button onClick={() => newMessageHandler(messages)}>Отправить</button>
                </div>
            </div>
        </div>
    )
}

export default GAccountChat;