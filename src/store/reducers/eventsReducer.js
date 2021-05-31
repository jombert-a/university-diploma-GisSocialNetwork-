export const SET_EVENTS = "SET_EVENTS";

const initialState = {
    events: []
}

export const setEvents = payload => ({
    type: SET_EVENTS,
    payload
})

export function eventsReducer (state = initialState, action) {
    switch (action.type) {
        case SET_EVENTS:
            return {
                ...state,
                events: action.payload
            }
        default:
            return state;
    }
}