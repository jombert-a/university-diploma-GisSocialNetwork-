import { combineReducers } from "redux";
import { globalReducer } from "./globalReducer";
import { mapObjectsReducer } from "./mapObjectsReducer";
import { eventsReducer } from "./eventsReducer";

export default combineReducers({ global: globalReducer, mapObjects: mapObjectsReducer, events: eventsReducer });
