import React from 'react'
import img from '../../assets/temp/islands-200.jpg';

const GAccountPage = props => {

    const [birthday, setBirthday] = React.useState('18 августа 1999 г.');
    const [city, setCity] = React.useState('Уфа');
    const [university, setUniversity] = React.useState('IT-институт УГНТУ');
    const [status, setStatus] = React.useState('ст. гр. БПО-17-01');
    const [isEdit, setIsEdit] = React.useState(true);
    return (
        <div className="g-account-page">
            <header>
                <div className="g-account-page__photo">
                    <img src={img} alt=""/>
                    <button className={"g-account-page__edit"} onClick={() => setIsEdit(!isEdit)}>Редактировать</button>
                </div>
                <div>
                    <h3>Ахияров Роберт</h3>
                    <input value={status} disabled={isEdit} onChange={(e) => setStatus(e.target.value)}/>
                    <div className={"g-account-page__info"}>
                        <div>
                            <span className={"g-account-page__prop"}>Дата рождения:</span>
                            <span className={"g-account-page__prop"}>Город:</span>
                            <span className={"g-account-page__prop"}>Место учебы:</span>
                        </div>
                        <div>
                            <input value={birthday}  disabled={isEdit} onChange={(e) => setBirthday(e.target.value)}/>
                            <input value={city}  disabled={isEdit} onChange={(e) => setCity(e.target.value)}/>
                            <input value={university}  disabled={isEdit} onChange={(e) => setUniversity(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </header>
            
        </div>
    )
}

export default GAccountPage;