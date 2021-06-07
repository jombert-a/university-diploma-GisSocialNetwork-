export const SET_AUTH = "SET_AUTH"
export const SET_ID = "SET_ID"
export const SET_EMAIL = "SET_EMAIL"
export const SET_USERNAME = "SET_USERNAME"

const initialState = {
    isAuth: false,
    userId: null,
    email: null,
    username: null
}

export function authReducer (state = initialState, action) {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        case SET_ID: {
            return {
                ...state,
                userId: action.payload
            }
        }
        case SET_EMAIL: {
            return {
                ...state,
                email: action.payload
            }
        }
        case SET_USERNAME: {
            return {
                ...state,
                username: action.payload
            }
        }
        default:
            return state;
    }
}