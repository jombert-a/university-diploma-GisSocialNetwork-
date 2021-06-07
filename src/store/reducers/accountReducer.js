export const SET_USERS = "SET_USERS"
export const SET_FRIENDS = "SET_FRIENDS"
export const SET_FRIEND_REQUESTS = "SET_FRIEND_REQUESTS"

const initialState = {
    users: [],
    friends: [],
    friendRequests: []
}

export function accountReducer (state = initialState, action) {
    switch (action.type) {
        case SET_FRIENDS:
            return {
                ...state,
                friends: action.payload
            }
        case SET_FRIEND_REQUESTS: {
            return {
                ...state,
                friendRequests: action.payload
            }
        }
        default:
            return state;
    }
}