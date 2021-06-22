import {instance} from "../index";

export const apiFriendship = {
    getFriends (userId) {
        return instance.get(`Friendship/GetFriends/${userId}`)
            .then ( response => response.data );
    },
    addFriend (receiverId) {
        const token = sessionStorage.getItem('token');
        return instance.post(`Friendship/${receiverId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    getFriendRequests () {
        const token = sessionStorage.getItem('token');

        return instance.get(`Friendship/GetFriendRequests`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then ( response => response.data );
    },
    editFriendship (payload) {
        const token = sessionStorage.getItem('token');
        return instance.put(`Friendship/${payload.id}/${payload.status}`,
            {

            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then ( response => response.data )
    },
    deleteFriend (id) {
        const token = sessionStorage.getItem('token');
        return instance.delete(`Friendship/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}