import {instance} from "../index";

export const apiUprofileImages = {
    getProfileImage (userId) {
        return instance.get(`UprofileImages/${userId}`);
    }
}