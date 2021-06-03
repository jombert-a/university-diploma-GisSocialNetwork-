import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {NEW_MESSAGE} from "../../store/reducers/friendsReducer";

const GAccountMessages = props => {
    let activeDialogs = useSelector(state => state.friends.activeDialogs);
    const friends = useSelector(state => state.friends.friends);
    const [activeDialogsDOM, setActiveDialogsDOM] = React.useState([]);
    const [openDialog, setOpenDialog] = React.useState('0');
    const [openDialogMessagesDOM, setDialogMessagesDOM] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState('');
    const dispatch = useDispatch();
    const history = useLocation();
    function newMessageHandler() {
        dispatch({type: NEW_MESSAGE, payload: {id: +openDialog, message: {userId: 0, text: newMessage}}});
        setNewMessage('');
    }
    React.useEffect(() => {
        let pathname = history.pathname;
        pathname = pathname.split('/');
        if (pathname[pathname.length - 1] !== 'messages')
            setOpenDialog(pathname[pathname.length - 1]);
        else
            setOpenDialog('0');
    }, [history])
    React.useEffect(() => {
        let buff = [];
        activeDialogs.forEach((el) => {
            const friend = friends.find(elem => elem.id === el.id);
            const friendDOM =
                <li className={"g-account-messages__li"} key={friend.id} onClick={setOpenDialog(friend.id)}>
                    <Link to={`/account/messages/${friend.id}`}>
                        {friend.name}
                    </Link>
                </li>
            buff.push(friendDOM)
        });
        setActiveDialogsDOM(buff.reverse())
    }, [activeDialogs, friends])
    React.useEffect(() => {
        if (openDialog !== '0') {
            let buff = [];
            activeDialogs.find(el => el.id === +openDialog)?.messages.forEach(el => {
                const message =
                    <p className={`g-account-messages__el ${el.userId === 0 ? 'g-account-messages__el--end' : ''}`}>{el.text}</p>
                buff.push(message)
            })
            setDialogMessagesDOM(buff);
        }
    }, [openDialog, activeDialogs])
    return (
        <div>
            <h3>Мои диалоги</h3>
            <p>Активные диалоги</p>
            <div className={"g-account-messages__body"}>
                <ul className={"g-account-messages__ul"}>
                    {activeDialogsDOM}
                </ul>
                <div >
                    {openDialog !== '0' &&
                    <div className={"g-account-messages__chat"}>
                        Открытый диалог
                        {openDialogMessagesDOM}
                        <div className={"g-account-messages__input"}>
                            <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
                            <button onClick={() => newMessageHandler()}>Отправить</button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GAccountMessages;