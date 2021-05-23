import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'http://139.162.168.53:8989/api/'
});

// location api
export const apiLocation = {
    getCityByCoords (coords) {
        return instance.get(`Location/PointInCity?lng=${coords.lng}&lat=${coords.lat}`)
            .then(response => {
                return response.data
            })
    },
    getObjectsByCoords (cul, clr) {
        return instance.get(`/Objects/GetPreviewByCoord/coord?lat1=${cul[1]}&lng1=${cul[0]}&lat2=${clr[1]}&lng2=${clr[0]}`)
            .then(response => {
                return response.data;
            });
    }

}

