import {instance} from "../index";

export const apiObjects = {
    getInfoById (entityId) {
        return instance.get(`Objects/${entityId}`)
            .then(response => {
                return response.data;
            })
    },
    getObjectsByCoords (cul, clr) {
        return instance.get(`/Objects/GetPreviewByCoord/coord?lat1=${cul.lat}&lng1=${cul.lng}&lat2=${clr.lat}&lng2=${clr.lng}`)
            .then(response => {
                return response.data;
            });
    },
    getObjectsByClassifier (id) {
        return instance.get(`/Objects/GetPreviewByClassifier/${id}`)
            .then(response => response.data)
    },
    postObject (object) {
        const token = sessionStorage.getItem('token');
        return instance.post(`Objects`, object,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    }
}