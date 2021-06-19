export const SET_USERS = "SET_USERS"
export const SET_FRIENDS = "SET_FRIENDS"
export const SET_FRIEND_REQUESTS = "SET_FRIEND_REQUESTS"
export const SET_CHATS = "SET_CHATS"
export const SET_NEW_MESSAGE = "SET_NEW_MESSAGE"
export const SET_MESSAGES = "SET_MESSAGES"

const initialState = {
    users: [],
    friends: [],
    friendsId: [],
    friendRequests: [],
    chats: [],
    messages: [],
    newMessage: {}
}

export function accountReducer (state = initialState, action) {
    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                friends: action.payload,
                friendsId: action.payload.map(el => el.idUser)
            }
        case SET_FRIEND_REQUESTS: {
            return {
                ...state,
                friendRequests: action.payload
            }
        }
        case SET_CHATS: {
            return {
                ...state,
                chats: action.payload
            }
        }
        default:
            return state;
    }
}