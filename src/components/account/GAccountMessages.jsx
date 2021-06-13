import React from 'react'
import {apiChatRooms} from "../../api/ChatRooms";
import {SET_CHATS} from "../../store/reducers/accountReducer";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import GAccountChat from "./GAccountChat";


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
        }, []
    )

    React.useMemo(() => {
            let array = [];
            chats.forEach(el => {
                const chat =
                    <li key={el.idChat}>
                        <Link to={`/account/messages/${el.idChat}`}>
                            <div>
                                <p>{el.chatName}</p>
                                {el.lastMessage ? <p>{el.lastMessage.messageText}</p> : ''}
                            </div>
                        </Link>
                    </li>
                array.push(chat);
            })
        setChatsDOM(array);
        }, [chats]
    )

    return (
        <div>
            <h3>Мои диалоги</h3>
            <div>
                <ul>
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