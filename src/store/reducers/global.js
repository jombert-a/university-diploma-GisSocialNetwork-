const SET_COORDS = "SET_COORDS"

const initialState = {
    location: 'area',
    lngCenter: null,
    latCenter: null
};

export const setCoords = content => ({
    type: SET_COORDS,
    payload: {
        lng: content.lng,
        lat: content.lat
    }
})

export const getCoords = store => {
    return {
        lng: store.global.lngCenter,
        lat: store.global.latCenter
    }
};

export const getLocation = store => store.global.location;

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_COORDS: {
            const {lng, lat} = action.payload;
            return {
                ...state,
                lngCenter: lng,
                latCenter: lat
            }
        }

        default:
            return state;
    }
}
