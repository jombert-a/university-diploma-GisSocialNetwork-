import {instance} from "../index";

export const apiChatRooms = {
    getUserChatRooms () {
        const token = sessionStorage.getItem('token');
        return instance.get('ChatRooms/GetUserChatRooms', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then ( response => response.data );
    },
    createPersonalChat (payload) {
        const token = sessionStorage.getItem('token');
        return instance.post(`ChatRooms/CreatePersonalChat`,
            {
                chatName: payload.name,
                receiver: payload.id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then ( result => result.data );
    }
}