import { combineReducers } from "redux";
import { globalReducer } from "./globalReducer";
import { mapObjectsReducer } from "./mapObjectsReducer";

export default combineReducers({ global: globalReducer, mapObjects: mapObjectsReducer });
