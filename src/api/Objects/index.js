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
    postObjectTest () {
        const token = sessionStorage.getItem('token');
        return instance.post(`Objects`, {
                way: {
                    type: "Point",
                    coordinates: [
                        55.46947237053552,
                        54.79270569121833
                    ]
                },
                title: "Байрам",
                previewDescription: "Продуктовый магазин",
                description: "Продуктовый магазин байрам",
                categoryId: 2,
                private: false,
                address: "Уфа",
                price: 0,
                typeId: 1
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    }
}