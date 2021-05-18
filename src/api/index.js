import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'http://139.162.168.53:8989/api/'
});

// location api
export const apiLocation = {
    getCityByCoords (coords) {
        return instance.get(`Location/PointInCity?lng=${coords.lng}&lat=${coords.lat}`)
            .then(response => {
                console.log(response.data);
                return response.data
            })
    }
}

