import { all } from 'redux-saga/effects'
import { objectsWatcher } from './globalSaga'

export default function* rootWatcher() {
    yield all([objectsWatcher]);
}