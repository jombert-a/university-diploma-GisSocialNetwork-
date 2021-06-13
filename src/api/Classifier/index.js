import {instance} from "../index";

export const apiClassifier = {
    getCategoryClassifiers () {
        return instance.get(`CategoryClassifiers`)
            .then( response => response.data );
    }
}
