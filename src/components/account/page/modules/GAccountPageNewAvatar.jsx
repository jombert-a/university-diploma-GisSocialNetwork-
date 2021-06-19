import React from 'react'
import {apiUprofileImages} from "../../../../api/UprofileImages";
import {useSelector} from "react-redux";
import style from '../style.module.css';

const GAccountPageNewAvatar = props => {
    const [newUserImage, setNewUserImage] = React.useState(null);
    const userId = useSelector(state => state.auth.userId);

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
        <form onSubmit={(e) => loadHandler(e)} className={style.info}>
            <input type="file" onChange={(e) => setNewUserImage(e.target.files[0])} className={'button'}/>
            <button className={'button--tab'}>Загрузить</button>
        </form>
    )
}

export default GAccountPageNewAvatar;