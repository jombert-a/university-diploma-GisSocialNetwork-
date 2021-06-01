export const SET_EVENTS = "SET_EVENTS";
export const SET_SELECTED_EVENT = "SET_SELECTED_EVENT"

const initialState = {
    events: [],
    selectedEvent: null
}

export const setEvents = payload => ({
    type: SET_EVENTS,
    payload
})

export const setSelectedEvent = payload => ({
    type: SET_SELECTED_EVENT,
    payload
})

export function eventsReducer (state = initialState, action) {
    switch (action.type) {
        case SET_EVENTS:
            return {
                ...state,
                events: action.payload
            }
        case SET_SELECTED_EVENT:
            return {
                ...state,
                selectedEvent: action.payload
            }
        default:
            return state;
    }
}