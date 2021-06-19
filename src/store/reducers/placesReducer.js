export const SET_PLACES = 'SET_PLACES'
export const SET_SELECTED_PLACE = 'SET_SELECTED_PLACE'

const initialState = {
    places: [],
    selectedPlace: {}
}

export function placesReducer (state = initialState, action) {
    switch (action.type) {
        case SET_PLACES: {
            return {
                ...state,
                places: action.payload
            }
        }
        case SET_SELECTED_PLACE: {
            return {
                ...state,
                selectedPlace: action.payload
            }
        }
        default: {
            return state
        }
    }
}