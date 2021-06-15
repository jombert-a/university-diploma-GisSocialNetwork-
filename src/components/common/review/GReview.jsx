import React from 'react'
import {apiReviews} from "../../../api/Reviews";
import {useSelector} from "react-redux";
import '../../../style/review/review.css'

const Review = props => {

    function handleSubmit (e) {
        e.preventDefault();
        if (newReview) {
            apiReviews.postNewReview(props.typeId, props.id, +rating, newReview);
            apiReviews.getReviewsByIds(props.typeId, props.id, page)
                .then ( result => setReviews(result));
            setRating(5);
            setNewReview('');
        }
    }

    const [newReview, setNewReview] = React.useState('');
    const [page] = React.useState(1);
    const [reviews, setReviews] = React.useState([]);
    const [rating, setRating] = React.useState(5);

    const isAuth = useSelector(state => state.auth.isAuth);

    console.log(reviews);

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
                    <div className={`g-review__controller`}>
                        <select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <button className={'button'}>Отправить</button>
                    </div>
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