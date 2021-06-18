import React from 'react'
import style from '../style.module.css';
import {apiAccount} from "../../../../api/Account";

const GAccountPageInfo = props => {
    const [accountDetail, setAccountDetail] = React.useState({});
    const [isEdit, setIsEdit] = React.useState(true);

    React.useEffect(
        () => {
            setAccountDetail(props.account);
        }, [props.account]
    )

    React.useEffect(
        () => {
            setIsEdit(props.isEdit)
        }, [props.isEdit]
    )

    function saveHandler() {
        setIsEdit(true);
        apiAccount.editAccount(accountDetail);
    }

    return (
        <div className={style.info}>
            <label className={style.label}>
                <span>
                    Полное имя
                </span>
                <input className={style.input} disabled={isEdit} value={accountDetail.fullname} onChange={(e) => setAccountDetail({...accountDetail, fullname: e.target.value})}/>
            </label>
            <label className={style.label}>
                <span>
                    Электронная почта
                </span>
                <input className={style.input} disabled={isEdit} value={accountDetail.email} onChange={(e) => setAccountDetail({...accountDetail, email: e.target.value})}/>
            </label>
            <label className={style.label}>
                <span>
                    Дата рождения
                </span>
                <input className={style.input} disabled={isEdit} value={accountDetail.birthDate} onChange={(e) => setAccountDetail({...accountDetail, birthDate: e.target.value})}/>
            </label>
            {
                isEdit ||
                <button className={'button'} onClick={() => saveHandler()}>Сохранить</button>
            }
        </div>
    )
}

export default GAccountPageInfo;