import {instance} from "../index";

export const apiPhoto = {
    getPhotosByIds (entityId, typeId) {
        return instance.get(`Photos/GetPhotosForEntity/${typeId}/${entityId}`)
            .then(response => {
                return response.data;
            });
    }
}