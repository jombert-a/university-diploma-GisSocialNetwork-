const SET_COORDS = "SET_COORDS"
const SET_CITY = "SET_CITY"
export const GET_CITY = "GET_CITY"

const initialState = {
    location: 'area',
    lngCenter: null,
    latCenter: null
}
/* SET */

export const setCity = payload => ({
        type: SET_CITY,
        payload
    }
)

export const setCoords = content => ({
    type: SET_COORDS,
    payload: {
        lng: content.lng,
        lat: content.lat
    }
})

/* GET */
export const getCity = (payload) => {
    console.log('get_city');
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
                    location: action.payload.en
                }
            else
                return {
                    ...state,
                    location: 'area'
                }

        }
        default:
            return state;
    }
}
