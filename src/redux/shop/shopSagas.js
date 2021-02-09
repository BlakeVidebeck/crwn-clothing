import { takeLatest, call, put } from 'redux-saga/effects'

import {
	firestore,
	convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils'

import { fetchCollectionsSuccess, fetchCollectionsFail } from './shopActions'

import { FETCH_COLLECTIONS_START } from './shopTypes'

export function* fetchCollectionsAsync() {
	try {
		const collectionRef = firestore.collection('collections')
		const snapshot = yield collectionRef.get()
		const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)

		yield put(fetchCollectionsSuccess(collectionsMap))
	} catch (err) {
		yield put(fetchCollectionsFail(err.message))
	}
}

export function* fetchCollectionsStart() {
	yield takeLatest(FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}
