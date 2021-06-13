import {instance} from "../index";

export const apiMessages = {
    getMessages (id) {
        return instance.get(`Messages/GetMessages/${id}`)
            .then (response => response.data)
    }
}