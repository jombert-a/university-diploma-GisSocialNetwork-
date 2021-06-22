import React from 'react'
import {apiChatRooms} from "../../../api/ChatRooms";
import {SET_CHATS} from "../../../store/reducers/accountReducer";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import GAccountChat from "../chat/GAccountChat";
import  '../../../style/account/accountMessages.css';
import style from './style.module.css'

const GAccountMessages = props => {
    const dispatch = useDispatch();
    const chats = useSelector(state => state.account.chats);
    const [chatsDOM, setChatsDOM] = React.useState([]);
    const history = useLocation();
    const [openDialog, setOpenDialog] = React.useState(null);

    React.useMemo(() => {
        let pathname = history.pathname;
        pathname = pathname.split('/');
        if (pathname[pathname.length - 1] !== 'messages') {
            setOpenDialog(pathname[pathname.length - 1]);
        }
        else
            setOpenDialog(null);
    }, [history])

    React.useEffect(
        () => {
            apiChatRooms.getUserChatRooms()
                .then ( result => {
                    dispatch({type: SET_CHATS, payload: result})
                })
        }, [dispatch]
    )

    React.useMemo(() => {
            let array = [];
            chats.forEach(el => {
                const chat =
                    <li key={el.idChat} className={'g-account-messages__chat-item'}>
                        <Link to={`/account/messages/${el.idChat}`}>
                            <div>
                                <p>{el.chatName}</p>
                                {el.lastMessage ? <p className={`g-account-messages__last-message`}>{el.lastMessage.messageText}</p> : ''}
                            </div>
                        </Link>
                    </li>
                array.push(chat);
            })
        setChatsDOM(array);
        }, [chats]
    )

    return (
        <div className={style.body}>
            <h4>Мои диалоги</h4>
            <div className={style.inner}>
                <ul className={style['chat-list']}>
                    {chatsDOM}
                </ul>
                {
                    openDialog && <GAccountChat id={openDialog} />
                }
            </div>
        </div>
    )
}

export default GAccountMessages;