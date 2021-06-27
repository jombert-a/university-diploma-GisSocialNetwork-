import {instance} from "../index";

export const apiFavourites = {
    addToFavourites(payload) {
        const token = sessionStorage.getItem('token');
        return instance.post('Favourites',
            {
                typeId: payload.typeId,
                entityId: payload.idEntity,
                "addedTime": "2021-05-20T16:00:00",
                notification: false
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    },
    getFavourites() {
        const token = sessionStorage.getItem('token');
        return instance.get('Favourites/GetFavouritesForUser', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.data)
    }
}