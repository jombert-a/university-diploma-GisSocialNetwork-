import {instance} from "../index";

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
    },
    getEventsByClassifierId (id) {
        return instance.get(`Events/GetEventsByClassifier/${id}`)
            .then ( response => response.data )
    }
}