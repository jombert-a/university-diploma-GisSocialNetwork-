export const SET_TOKEN = "SET_TOKEN"

const initialState = {
    accessToken: null
}

export function authReducer (state = initialState, action) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                accessToken: action.payload
            }
        default:
            return state;
    }
}