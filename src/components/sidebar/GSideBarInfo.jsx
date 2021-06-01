import React, {useEffect} from 'react'
import '../../style/sidebar/GSideBarInfo.css'
import {apiObjects, apiPhoto, apiReviews} from "../../api";
import {GSwiper} from "../common/swiper";

const GSideBarInfo = (props) => {
    const [data, setData] = React.useState();
    const [photoArray, setPhotoArray] = React.useState([]);
    const [reviews, setReviews] = React.useState();

    useEffect(
        () => {
            apiObjects.getInfoById(props.object.idEntity)
                .then(data => setData(data));
            apiPhoto.getPhotosByIds(props.object.idEntity, props.object.typeId)
                .then(data => setPhotoArray(data));
            apiReviews.getReviewsByIds(props.object.typeId, props.object.idEntity)
                .then(data => setReviews(data));
        }, [props.object.idEntity, props.object.typeId]
    );

    const photos = photoArray.map(el => (
        <div className={'g-side-bar-info__image'}>
            <img alt='картинка' src={`http://139.162.168.53:8989/api/Photos/GetImgThumb/${el}`} />
        </div>
    ));

    let [tab, setTab] = React.useState('contacts');
    let [newReview, setNewReview] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setNewReview('');
    }

    const tabs = () => {
        switch(tab) {
            case 'contacts':
                return (
                    <GSwiper array={photos}/>
                )
            default:
                return (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <p>Оставить отзыв:</p>
                                <textarea value={newReview} onChange={(e) => setNewReview(e.target.value)}/>
                            </label>
                            <button>Отправить</button>
                        </form>
                        <p>Отзывы:</p>
                        {
                            reviews.map(el => (
                                <div className={'g-side-bar-info__review'}>
                                    <span>Пользователь {el.userId}</span>
                                    <p>{el.reviewText}</p>
                                    <span>Оценка: {el.ratingValue}</span>
                                </div>
                            ))
                        }
                    </div>
                )

        }
    }

    return (
        <div className={'g-side-bar-info'}>
            {   data &&
                <header className={'g-side-bar-info__header'}>
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                    <p>{data.address}</p>
                    <h3>Рейтинг: {data.rating}</h3>
                    <div>
                        <button onClick={() => setTab('contacts')}>Контакты</button>
                        <button onClick={() => setTab('reviews')}>Отзывы</button>
                    </div>
                </header>
            }
            {tabs(tab)}
        </div>
    )
}

export default GSideBarInfo;