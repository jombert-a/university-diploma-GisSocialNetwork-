import { combineReducers } from "redux";
import { globalReducer } from "./globalReducer";
import { mapObjectsReducer } from "./mapObjectsReducer";
import { eventsReducer } from "./eventsReducer";
import {friendsReducer} from "./friendsReducer";
import {authReducer} from "./authReducer";

export default combineReducers({ global: globalReducer, mapObjects: mapObjectsReducer, events: eventsReducer, friends: friendsReducer, auth: authReducer });
