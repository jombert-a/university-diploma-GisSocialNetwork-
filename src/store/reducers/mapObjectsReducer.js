const SET_OBJECTS = "SET_OBJECTS";
const SET_SELECTED_OBJECT = "SET_SELECTED_OBJECT";

const initialState = {
    objects: [],
    selectedObject: null
}

/* SET */
export const setObjects = payload => (
    {
        type: SET_OBJECTS,
        payload
    }
)

export const setSelectedObject = payload => (
    {
        type: SET_SELECTED_OBJECT,
        payload
    }
)

export function mapObjectsReducer (state = initialState, action) {
    switch (action.type) {
        case SET_OBJECTS: {
            return {
                ...state,
                objects: action.payload
            }
        }
        case SET_SELECTED_OBJECT: {
            console.log('set selected');
            return {
                ...state,
                selectedObject: action.payload
            }
        }
        default:
            return state;
    }
}
