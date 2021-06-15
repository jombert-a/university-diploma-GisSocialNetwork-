import {instance} from "../index";

export const apiRoutes = {
    getRoutes() {
        return instance.get('Routes')
            .then (response => response.data)
    }
}