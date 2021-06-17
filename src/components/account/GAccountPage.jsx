import React from 'react'
import img from '../../assets/temp/default.png';
import {apiAccount} from "../../api/Account";
import {useSelector} from "react-redux";
import {apiUprofileImages} from "../../api/UprofileImages";

const GAccountPage = props => {

    const [account, setAccount] = React.useState({
        username: '',
        birthday: '',
        fullname: '',
        email: '',
    });
    const [isEdit, setIsEdit] = React.useState(true);
    const [isNewAvatar, setIsNewAvatar] = React.useState(false);
    const [userImage, setUserImage] = React.useState({});
    const [newUserImage, setNewUserImage] = React.useState(null);
    const [userImageDOM, setUserImageDOM] = React.useState(<></>);
    const userId = useSelector(state => state.auth.userId);

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
                let p1 = apiAccount.getAccount(userId)
                let p2 = apiUprofileImages.getProfileImage(userId)
                Promise.all([p1, p2])
                    .then (value => {
                        setAccount(clearFromNull(value[0]));
                        setUserImage(value[1]);
                    })
            }
        }, [userId]
    )

    React.useEffect(
        () => {
             if (Object.keys(userImage).length > 0 && userImage.uprofileImg !== 'default') {
                setUserImageDOM(
                    <img src={`http://139.162.168.53:8989/api/UprofileImages/GetImgThumb/${userId}`} alt={'avatar'}/>
                )
            }
            else {
                setUserImageDOM(
                    <img src={img} alt={'avatar'}/>
                )
            }
        }, [userImage, userId]
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
        <div className="g-account-page">
            <header>
                <div className="g-account-page__photo">
                    {userImageDOM}
                    <button className={"button"} onClick={() => setIsEdit(!isEdit)}>Редактировать</button>
                    <button className={"button"} onClick={() => setIsNewAvatar(!isNewAvatar)}>Новая фотография</button>
                    {
                        isNewAvatar &&
                        <form onSubmit={(e) => loadHandler(e)}>
                            <input type="file" onChange={(e) => setNewUserImage(e.target.files[0])} className={'button'}/>
                            <button className={'button--tab'}>Загрузить</button>
                        </form>
                    }
                </div>
                <div>
                    <h3>{account.username}</h3>
                    <div className={"g-account-page__info"}>
                        <div>
                            <span className={"g-account-page__prop"}>Полное имя:</span>
                            <span className={"g-account-page__prop"}>Дата рождения:</span>
                            <span className={"g-account-page__prop"}>Электронная почта:</span>
                        </div>
                        <div>
                            <input value={account.fullname} disabled={isEdit} onChange={(e) => setAccount({...account, fullname: e.target.value})}/>
                            <input value={account.birthday}  disabled={isEdit} onChange={(e) => setAccount({...account, birthday: e.target.value})}/>
                            <input value={account.email}  disabled={isEdit} onChange={(e) => setAccount({...account, email: e.target.value})}/>
                        </div>
                    </div>
                </div>
            </header>
            
        </div>
    )
}

export default GAccountPage;