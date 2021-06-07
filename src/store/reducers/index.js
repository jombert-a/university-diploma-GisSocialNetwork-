import { combineReducers } from "redux";
import { globalReducer } from "./globalReducer";
import { mapObjectsReducer } from "./mapObjectsReducer";
import { eventsReducer } from "./eventsReducer";
import {authReducer} from "./authReducer";
import {accountReducer} from "./accountReducer";

export default combineReducers({ global: globalReducer, mapObjects: mapObjectsReducer, events: eventsReducer, auth: authReducer, account: accountReducer });
