import {instance} from "../index";

export const apiAccount = {
    authenticate (username, password) {
        return instance.post('Account/Authenticate', {
            username: username,
            password: password,
        })
            .then( response => response.data)
    },
    register (payload) {
        return instance.post('Account/Register', {
            username: payload.username,
            email: payload.email,
            fullname: payload.fullname,
            birthDate: payload.birthday,
            password: payload.password
        })
            .then ( response => response );
    },
    getUsers () {
        return instance.get('Account/GetUsers')
            .then ( response => response.data )
    },
    getAccount (userId) {
        return instance.get(`Account/GetUser/${userId}`)
            .then (response => response.data)
    },
    editAccount (payload) {
        console.log(payload);
        const token = sessionStorage.getItem('token');
        return instance.put(`Account/${payload.idUser}`, payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    }
}