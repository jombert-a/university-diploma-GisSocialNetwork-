export const SET_COORDS = "SET_COORDS"
export const SET_CITY = "SET_CITY"
export const ADD_TYPE = "ADD_TYPE"
export const DELETE_TYPE = "DELETE_TYPE"
export const GET_CITY = "GET_CITY"
export const SET_SELECTED_TYPE = "SET_SELECTED_TYPE"

const initialState = {
    location: {
        en: 'area',
        ru: 'район'
    },
    lngCenter: null,
    latCenter: null,
    types: [],
    selectedType: ''
}

/* SET */

export const setCity = payload => ({
        type: SET_CITY,
        payload
    }
)

export const setCoords = payload => ({
    type: SET_COORDS,
    payload
})

export const addType = payload => ({
    type: ADD_TYPE,
    payload
})

export const deleteType = payload => ({
    type: DELETE_TYPE,
    payload
})

export const setSelectedType = payload => ({
    type: SET_SELECTED_TYPE,
    payload
})

/* GET */
export const getCity = (payload) => {
    return {type: GET_CITY, payload}
};

export const getCoords = store => {
    return {
        lng: store.global.lngCenter,
        lat: store.global.latCenter
    }
}

export const getLocation = store => store.global.location

export function globalReducer (state = initialState, action) {
    switch (action.type) {
        case SET_COORDS: {
            const {lng, lat} = action.payload;
            return {
                ...state,
                lngCenter: lng,
                latCenter: lat
            }
        }
        case SET_CITY: {
            if (action.payload.belongs)
                return {
                    ...state,
                    location: {
                        en: action.payload.en,
                        ru: action.payload.ru
                    }
                }
            else
                return {
                    ...state,
                    location: {
                        en: 'area',
                        ru: 'район'
                    }
                }
        }
        case ADD_TYPE: {
            return {
                ...state,
                types: [...state.types, action.payload]
            }
        }
        case DELETE_TYPE: {
            return {
                ...state,
                types: state.types.filter(el => el !== action.payload)
            }
        }
        case SET_SELECTED_TYPE: {
            return {
                ...state,
                selectedType: action.payload
            }
        }
        default:
            return state;
    }
}
