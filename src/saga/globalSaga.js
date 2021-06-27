import { call, put, takeEvery} from 'redux-saga/effects';
import { GET_CITY, setCity } from '../store/reducers/globalReducer';
import {apiLocation} from "../api/Location";


function* fetchCityWorker() {
    const data = yield call(apiLocation.getCityByCoords);
    yield put(setCity(data));
}

export function* objectsWatcher() {
    yield takeEvery(GET_CITY, fetchCityWorker);
}