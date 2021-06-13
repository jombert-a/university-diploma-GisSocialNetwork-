import {instance} from "../index";

export const apiReviews = {
    getReviewsByIds (typeId, entityId, page) {
        return instance.get(`Reviews/GetReviewsForEntity/${typeId}/${entityId}?page=${page}`)
            .then(response => response.data)
    },
    postNewReview (typeId, entityId, ratingValue, reviewText) {
        console.log(typeof ratingValue);
        const token = sessionStorage.getItem('token');
        return instance.post(`Reviews`,
            {
                typeId,
                entityId,
                ratingValue,
                reviewText
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }
}