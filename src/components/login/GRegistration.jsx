import React from 'react'
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../style/login/GRegistration.css'
import ru from 'date-fns/locale/ru';
import {apiAccount} from "../../api";
registerLocale('ru', ru)

const GRegistration = props => {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [fullname, setFullname] = React.useState('');
    const [birthday, setBirthday] = React.useState(Date.now());
    const [password, setPassword] = React.useState('');
    function handleSubmit(e) {
        e.preventDefault();
        apiAccount.register(
            {
                username,
                email,
                fullname,
                birthday,
                password
            }
        )
            .then ( result => console.log(result) )
            .catch ( result => console.log(result) )
    }
    return (
        <div className={'g-registration'}>
            <form className={'g-registration-form'} onSubmit={handleSubmit}>
                <label className={'g-registration-form__label'}>
                    <input className={'input'} placeholder={'Имя пользователя'} type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label className={'g-registration-form__label'}>
                    <input className={'input'} placeholder={'Почта'} type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label className={'g-registration-form__label'}>
                    <input className={'input'} placeholder={'Полное имя'} type="text" value={fullname} onChange={(e) => setFullname(e.target.value)}/>
                </label>
                <label className={'g-registration-form__label'}>
                    <DatePicker className={'input'} locale={'ru'} dateFormat={'yyyy-MM-dd'} selected={birthday} onChange={(date) =>  setBirthday(date)} />
                </label>
                <label className={'g-registration-form__label'}>
                    <input className={'input'} placeholder={'Пароль'} type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button className={'button'}>Регистрация</button>
            </form>
        </div>
    )
}

export default GRegistration;