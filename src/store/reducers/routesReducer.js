export const SET_ROUTES = "SET_ROUTES";
export const SET_SELECTED_ROUTE = "SET_SELECTED_ROUTE";

const initialState = {
    routes: [],
    selectedRoute: {
        way: {
            coordinates: []
        }
    }
}

export function routesReducer (state = initialState, action) {
    switch (action.type) {
        case SET_ROUTES: {
            return {
                ...state,
                routes: action.payload
            }
        }
        case SET_SELECTED_ROUTE: {
            return {
                ...state,
                selectedRoute: action.payload
            }
        }
        default:
            return state;
    }
}
