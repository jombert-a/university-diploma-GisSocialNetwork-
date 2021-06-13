import React from 'react'
import '../../style/login/GLogin.css'
import {apiAccount} from "../../api/Account";
import {useDispatch, useSelector} from "react-redux";
import {SET_AUTH, SET_EMAIL, SET_ID, SET_USERNAME} from "../../store/reducers/authReducer";
import {Link, Redirect} from "react-router-dom";

const GLogin = props => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [hidden, setHidden] = React.useState(true);
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);
    function handleSubmit(e) {
        e.preventDefault();
        apiAccount.authenticate(login, password)
            .then(result => {
                sessionStorage.setItem('token', result.accessToken);
                dispatch({type: SET_AUTH, payload: true});
                dispatch({type: SET_ID, payload: result.idUser});
                dispatch({type: SET_EMAIL, payload: result.email});
                dispatch({type: SET_USERNAME, payload: result.username});
            })
            .catch(result => {
                dispatch({type:  SET_AUTH, payload: false});
            })
    }
    return isAuth
        ? <Redirect push to={'/account'} />
        : <div className='g-login'>
            <form onSubmit={handleSubmit} className={'g-login-form'}>
                <label className={'g-login-form__label'}>
                    <input placeholder={'Логин'} className={'input'} type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
                </label>
                <label className={'g-login-form__label'}>
                    <input placeholder={'Пароль'} className={'input'} type={hidden ? 'text' : password} value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button className={'button'}>
                    Войти
                </button>
                <Link to={'/registration'} className={'g-login-form__reg text--sub text--center'}>Регистрация</Link>
            </form>
        </div>
}

export default GLogin;