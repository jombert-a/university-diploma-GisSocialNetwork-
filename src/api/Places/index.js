import {instance} from "../index";

export const apiPlaces = {
    getPlacesByCoords (cul, clr) {
        return instance.get(`Places/GetPreviewByCoord/coord?lat1=${cul.lat}&lng1=${cul.lng}&lat2=${clr.lat}&lng2=${clr.lng}`)
            .then(response => {
                return response.data;
            });
    },
    getDetailById (id) {
      return instance.get(`Places/${id}`)
          .then (response => response.data)
    },
    addNewPlace (place) {
        const token = sessionStorage.getItem('token');
        return instance.post(`Places`, place, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }
}