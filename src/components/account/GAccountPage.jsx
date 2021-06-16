import React from 'react'
import img from '../../assets/temp/islands-200.jpg';
import {apiAccount} from "../../api/Account";
import {useSelector} from "react-redux";
import {apiUprofileImages} from "../../api/UprofileImages";

const GAccountPage = props => {

    const [account, setAccount] = React.useState({});
    const [isEdit, setIsEdit] = React.useState(true);
    const [userImage, setUserImage] = React.useState({});
    const userId = useSelector(state => state.auth.userId);

    React.useEffect(
        () => {
            if (userId) {
                apiAccount.getAccount(userId)
                    .then ( result => setAccount(result) );
                apiUprofileImages.getProfileImage(userId)
                    .then ( result => setUserImage(result) );
            }
        }, [userId]
    )

    React.useEffect(
        () => {
            console.log(account);
        }, [account]
    )

    React.useEffect(
        () => {
            console.log(userImage, 'userImg')
        }, [userImage]
    )

    return (
        <div className="g-account-page">
            <header>
                <div className="g-account-page__photo">
                    <img src={img} alt=""/>
                    <button className={"g-account-page__edit"} onClick={() => setIsEdit(!isEdit)}>Редактировать</button>
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