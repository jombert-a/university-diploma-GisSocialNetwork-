import {instance} from "../index";

export const apiUprofileImages = {
    getProfileImage (userId) {
        return instance.get(`UprofileImages/GetImgThumb/${userId}`)
            .then(response => response.data);
    },
    postProfileImage (file, id) {
        const token = sessionStorage.getItem('token');
        return instance.post(`UprofileImages/UploadProfileImg`, file,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            })
    }
}