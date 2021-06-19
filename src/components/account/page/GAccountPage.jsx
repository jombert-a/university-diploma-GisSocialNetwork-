import React from 'react'
import banner from '../../../assets/content/profile-cover.jpg';
import banner1 from '../../../assets/content/peizaji-01.jpg';
import {apiAccount} from "../../../api/Account";
import {useSelector} from "react-redux";
import style from './style.module.css';
import {useParams} from "react-router-dom";
import GAccountPageInfo from "./modules/GAccountPageInfo";
import GAccountPageFavourites from "./modules/GAccountPageFavourites";
import GAccountPageNewAvatar from "./modules/GAccountPageNewAvatar";
import {apiFriendship} from "../../../api/Friendship";

const GAccountPage = props => {
    let params = useParams();
    const userId = useSelector(state => state.auth.userId);
    const friendsId = useSelector(state => state.account.friendsId);
    const [isEdit, setIsEdit] = React.useState(true);
    const [account, setAccount] = React.useState({
        username: '',
        birthday: '',
        fullname: '',
        email: '',
    });

    const [tab, setTab] = React.useState('info');
    const [tabComponent, setTabComponent] = React.useState(<></>);

    React.useEffect(
        () => {
            switch(tab) {
                case 'favourites':
                    setTabComponent(<GAccountPageFavourites id={params.id ? params.id : userId} />)
                    break
                case 'new-ava':
                    setTabComponent(<GAccountPageNewAvatar />)
                    break
                default:
                    setTabComponent(<GAccountPageInfo id={params.id ? params.id : userId} isEdit={isEdit} account={account}/>)
                    break
            }
        }, [tab, userId, params.id, isEdit, account]
    )

    React.useEffect(
        () => {
            if (userId) {
                function clearFromNull (object) {
                    let buff = JSON.parse(JSON.stringify(object));
                    Object.keys(buff).forEach(el => {
                        if (buff[el] === null) {
                            buff[el] = '';
                        }
                    });
                    return buff;
                }
                let p1 = apiAccount.getAccount(params.id ? params.id : userId)
                Promise.all([p1])
                    .then (value => {
                        setAccount(clearFromNull(value[0]));
                    })
            }
        }, [userId, params.id]
    )

    function addFriend (id) {
        apiFriendship.addFriend(id)
            .then ( result => console.log(result));
    }

    function deleteFriend (id) {
        apiFriendship.deleteFriend(id)
            .then (result => console.log(result));
    }

    return (
        <div className={style.body}>
            <header className={style.header}>
                <div className={style.banner}>
                    <img src={params.id ? banner1 : banner} alt={'bg'}/>
                    {
                        params.id ||
                        <div className={style.edit}>
                            <button className={"button"} onClick={() => setIsEdit(!isEdit)}>Редактировать</button>
                            <button className={"button"} onClick={() => setTab('new-ava')}>Новая фотография</button>
                        </div>
                    }
                </div>
                <div className={style.about}>
                    <div className={style.photo}>
                        <img src={`http://139.162.168.53:8989/api/UprofileImages/GetImgThumb/${params.id ? params.id : userId}`} alt={'avatar'}/>
                    </div>
                    <h4>{account.username}</h4>
                    <p>{account.fullname}</p>
                </div>
                <div className={style.actions}>
                    <div className={style.tabs}>
                        <span className={`${style.tab} ${tab === 'info' ? style['tab--clicked'] : ''}`} onClick={() => setTab('info')}>Информация</span>
                        {
                            params.id ? '' :
                            <span className={`${style.tab} ${tab === 'favourites' ? style['tab--clicked'] : ''}`} onClick={() => setTab('favourites')}>Избранное</span>
                        }
                    </div>
                    {
                        params.id && friendsId.includes(+params.id) ?
                        <button className={'button button--tab'} onClick={() => deleteFriend(params.id)}>
                            Удалить из друзей
                        </button> :
                        <button className={'button button--tab'} onClick={() => addFriend(params.id)}>
                            Добавить в друзья
                        </button>
                    }
                </div>
            </header>
            <div className={`${style.body} ${style['body--component']}`}>
                {tabComponent}
            </div>
        </div>
    )
}

export default GAccountPage;