import { call, put, takeEvery} from 'redux-saga/effects';
import { GET_CITY, setCity } from '../store/reducers/globalReducer';
import {apiLocation} from "../api";


function* fetchCityWorker() {
    console.log('test');
    const data = yield call(apiLocation.getCityByCoords);
    console.log(data);
    yield put(setCity(data));
}

export function* objectsWatcher() {
    yield takeEvery(GET_CITY, fetchCityWorker);
}