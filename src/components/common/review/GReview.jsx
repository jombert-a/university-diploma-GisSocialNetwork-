import React from 'react'
import {apiReviews} from "../../../api";
import {useSelector} from "react-redux";
import '../../../style/review/review.css'

const Review = props => {

    function handleSubmit (e) {
        e.preventDefault();
    }

    const [newReview, setNewReview] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [reviews, setReviews] = React.useState([]);

    const isAuth = useSelector(state => state.auth.isAuth);
    console.log(isAuth);
    React.useEffect(
        () => {
            apiReviews.getReviewsByIds(props.typeId, props.id, page)
                .then ( result => setReviews(result));
        }, [props.typeId, props.id, page]
    )

    return (
        <div>
            {
                isAuth &&
                <form onSubmit={handleSubmit}>
                    <label className={`g-review__new-review`}>
                        <p>Оставить отзыв:</p>
                        <textarea value={newReview} onChange={(e) => setNewReview(e.target.value)}/>
                    </label>
                    <button className={'button'}>Отправить</button>
                </form>
            }
            <p>Отзывы:</p>
            {
                reviews.length >= 1 ?
                    reviews.map(el => (
                        <div className={'g-side-bar-info__review'}>
                            <span>Пользователь {el.userId}</span>
                            <p>{el.reviewText}</p>
                            <span>Оценка: {el.ratingValue}</span>
                        </div>
                    ))
                    : <p>Еще никто не оставил отзыв</p>
            }
        </div>
    )
}

export default Review;