import React from 'react'
import banner from '../../../assets/content/profile-cover.jpg';
import {apiAccount} from "../../../api/Account";
import {useSelector} from "react-redux";
import {apiUprofileImages} from "../../../api/UprofileImages";
import style from './style.module.css';
import {useParams} from "react-router-dom";
import GAccountPageInfo from "./modules/GAccountPageInfo";
import GAccountPageFavourites from "./modules/GAccountPageFavourites";

const GAccountPage = props => {
    let params = useParams();
    const userId = useSelector(state => state.auth.userId);

    const [isEdit, setIsEdit] = React.useState(true);
    const [isNewAvatar, setIsNewAvatar] = React.useState(false);
    const [newUserImage, setNewUserImage] = React.useState(null);
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

    function loadHandler(e) {
        e.preventDefault();
        if (newUserImage !== null) {
            const formData = new FormData();
            formData.append(
                'file',
                newUserImage
            )
            formData.append(
                'jsonString',
                JSON.stringify({
                    "userId": userId,
                    "description": "profilePhotoDesc"
                })
            )
            apiUprofileImages.postProfileImage(formData, userId);
        }
    }

    return (
        <div className={style.body}>
            <header className={style.header}>
                <div className={style.banner}>
                    <img src={banner} alt={'bg'}/>
                    {
                        params.id ||
                        <div className={style.edit}>
                            <button className={"button"} onClick={() => setIsEdit(!isEdit)}>Редактировать</button>
                            <button className={"button"} onClick={() => setIsNewAvatar(!isNewAvatar)}>Новая фотография</button>
                        </div>
                    }
                </div>
                <div className={style.about}>
                    <div className={style.photo}>
                        <img src={`http://139.162.168.53:8989/api/UprofileImages/GetImgThumb/${params.id ? params.id : userId}`} alt={'avatar'}/>
                        {
                            isNewAvatar &&
                            <form onSubmit={(e) => loadHandler(e)}>
                                <input type="file" onChange={(e) => setNewUserImage(e.target.files[0])} className={'button'}/>
                                <button className={'button--tab'}>Загрузить</button>
                            </form>
                        }
                    </div>
                    <h4>{account.username}</h4>
                    <p>{account.fullname}</p>
                </div>
                <div className={style.actions}>
                    <div className={style.tabs}>
                        <span className={`${style.tab} ${tab === 'info' ? style['tab--clicked'] : ''}`} onClick={() => setTab('info')}>Информация</span>
                        {
                            params.id ||
                            <span className={`${style.tab} ${tab === 'favourites' ? style['tab--clicked'] : ''}`} onClick={() => setTab('favourites')}>Избранное</span>
                        }
                    </div>
                    {
                        params.id &&
                        <button className={'button button--tab'}>
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