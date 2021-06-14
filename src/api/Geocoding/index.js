import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org/',
});

export const apiGeocoding = {
    reverseFromCoordsToAdress (lng, lat) {
        return instance.get(`reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
            .then (response => response.data);
    }
}