import {
	FETCH_COLLECTIONS_START,
	FETCH_COLLECTIONS_SUCCESS,
	FETCH_COLLECTIONS_FAIL,
} from './shopTypes'

import {
	firestore,
	convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
	type: FETCH_COLLECTIONS_START,
})

export const fetchCollectionsSuccess = (collectionsMap) => ({
	type: FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap,
})
export const fetchCollectionsFail = (errorMessage) => ({
	type: FETCH_COLLECTIONS_FAIL,
	payload: errorMessage,
})

export const fetchCollectionsStartAsync = () => {
	return (dispatch) => {
		dispatch(fetchCollectionsStart())

		const collectionRef = firestore.collection('collections')

		collectionRef
			.get()
			.then((snapshot) => {
				const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
				dispatch(fetchCollectionsSuccess(collectionsMap))
			})
			.catch((err) => dispatch(fetchCollectionsFail(err.message)))
	}
}
