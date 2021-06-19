import React from 'react'
import {apiPlaces} from "../../../api/Places";
import {GSwiper} from "../../common/swiper";
import GReview from "../../common/review/GReview";
import {apiFavourites} from "../../../api/Favourites";
import {useSelector} from "react-redux";
import {apiPhoto} from "../../../api/Photo";

const GSideBarInfoPlace = props => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const [data, setData] = React.useState({});
    const [photoArray, setPhotoArray] = React.useState([]);
    let [tab, setTab] = React.useState('contacts');

    React.useEffect(
        () => {
            let p1 = apiPlaces.getDetailById(props.place.idEntity)
            let p2 = apiPhoto.getPhotosByIds(props.place.idEntity, props.place.typeId)
            Promise.all([p1, p2])
                .then(result => {
                    setData(result[0])
                    setPhotoArray(result[1])
                })
        }, [props.place.idEntity, props.place.typeId]
    )

    const photos = React.useMemo( () => photoArray.map(el => (
        <div className={'g-side-bar-info__image'}>
            <img alt='картинка' src={`http://139.162.168.53:8989/api/Photos/GetImgThumb/${el}`} />
        </div>
    )), [photoArray]);

    React.useEffect(
        () => {
            console.log(data);
        }, [data]
    )

    const tabs = () => {
        switch(tab) {
            case 'contacts':
                return (
                    <>
                        {
                            data &&
                            <div>
                                {data.address && <p>Адрес: {data.address}</p>}
                                {data.vk && <p>VK: {data.vk}</p>}
                                {data.phone && <p>Телефон: {data.phone}</p>}
                                {data.category && <p>Категория: {data.category.categoryName}</p>}

                            </div>
                        }
                        {
                            photoArray && photoArray.length > 0 ? <GSwiper array={photos}/> : <p>Фотографий нет</p>
                        }

                    </>
                )
            default:
                return (
                    <GReview typeId={props.place.typeId} id={props.place.idEntity} />
                )

        }
    }

    return (
        <div className={'g-side-bar-info'}>
            {   data &&
            <header className={'g-side-bar-info__header'}>
                <h4>{data.title}</h4>
                <p>{data.description}</p>
                <h4>Рейтинг: {data.rating}</h4>
                {
                    isAuth &&
                    <button className={'button'} onClick={() => apiFavourites.addToFavourites(data)}>Добавить в избранное</button>
                }
                <div>
                    <button className={`button button--tab ${tab === 'contacts' ? 'active' : ''}`} onClick={() => setTab('contacts')}>Контакты</button>
                    <button className={`button button--tab ${tab === 'reviews' ? 'active' : ''}`} onClick={() => setTab('reviews')}>Отзывы</button>
                </div>
            </header>
            }
            {tabs(tab)}
        </div>
    )
}

export default  GSideBarInfoPlace;