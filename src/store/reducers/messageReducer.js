export const SET_MESSAGES = "SET_MESSAGES";
export const SET_NEW_MESSAGE = "SET_NEW_MESSAGE"
export const SET_OPENED_CHAT = "SET_OPENED_CHAT"
export const SET_RECEIVED_MESSAGE = "SET_RECEIVED_MESSAGE"
export const ADD_TO_MESSAGES = "ADD_TO_MESSAGES"

const initialState = {
    messages: [],
    newMessage: {},
    receivedMessage: {},
    openedChat: null
}

export function messagesReducer (state = initialState, action) {
    switch (action.type) {
        case SET_MESSAGES: {
            return {
                ...state,
                messages: action.payload
            }
        }
        case SET_NEW_MESSAGE: {
            return {
                ...state,
                newMessage: action.payload
            }
        }
        case SET_OPENED_CHAT: {
            return {
                ...state,
                openedChat: action.payload
            }
        }
        case SET_RECEIVED_MESSAGE: {
            return {
                ...state,
                receivedMessage: action.payload
            }
        }
        case ADD_TO_MESSAGES: {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        }
        default:
            return state;
    }
}
