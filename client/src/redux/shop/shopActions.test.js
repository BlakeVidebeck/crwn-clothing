import {
	FETCH_COLLECTIONS_START,
	FETCH_COLLECTIONS_SUCCESS,
	FETCH_COLLECTIONS_FAIL,
} from './shopTypes'
import {
	fetchCollectionsStart,
	fetchCollectionsSuccess,
	fetchCollectionsFail,
} from './shopActions'

describe('fetchCollectionsStart action', () => {
	it('should create the fetchCollectionsStart action', () => {
		expect(fetchCollectionsStart().type).toEqual(FETCH_COLLECTIONS_START)
	})
})

describe('fetchCollectionsSuccess action', () => {
	it('should create the fetchCollectionsSuccess action', () => {
		const mockCollectionsMap = {
			hats: {
				id: 1,
			},
		}

		const action = fetchCollectionsSuccess(mockCollectionsMap)

		expect(action.type).toEqual(FETCH_COLLECTIONS_SUCCESS)
		expect(action.payload).toEqual(mockCollectionsMap)
	})
})

describe('fetchCollectionsFail action', () => {
	it('should create the fetchCollectionsFail action', () => {
		const action = fetchCollectionsFail('error')

		expect(action.type).toEqual(FETCH_COLLECTIONS_FAIL)
		expect(action.payload).toEqual('error')
	})
})
