import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'http://139.162.168.53:8989/api/'
});

export const apiLocation = {
    getCityByCoords (coords) {
        return instance.get(`Location/PointInCity?lng=${coords.lng}&lat=${coords.lat}`)
            .then(response => {
                return response.data
            });
    },
}

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
    }
}

export const apiPhoto = {
    getPhotosByIds (entityId, typeId) {
        return instance.get(`Photos/GetPhotosForEntity/${typeId}/${entityId}`)
            .then(response => {
                return response.data;
            });
    }
}

export const apiReviews = {
    getReviewsByIds (typeId, entityId) {
        return instance.get(`Reviews/GetReviewsForEntity/${typeId}/${entityId}`)
            .then(response => response.data)
    }
}

export const apiEvents = {
    getEventsByCoords (cul, clr) {
        return instance.get(`Events/GetPreviewByCoord/coord?lat1=${cul.lat}&lng1=${cul.lng}&lat2=${clr.lat}&lng2=${clr.lng}`)
            .then( response => {
                return response.data
            } )
    },
    getEventById (idEntity) {
        return instance.get(`Events/${idEntity}`)
            .then( response => response.data );
    },
    getEventsInCity (city) {
        return instance.get(`Events/GetInCity/${city}`)
            .then( response => response.data )
    }
}

export const apiClassifier = {
    getCategoryClassifiers () {
        return instance.get(`CategoryClassifiers`)
            .then( response => response.data );
    }
}
