import {
	FETCH_COLLECTIONS_START,
	FETCH_COLLECTIONS_SUCCESS,
	FETCH_COLLECTIONS_FAIL,
} from './shopTypes'
import { shopReducer } from './shopReducer'

const initialState = {
	collections: null,
	isFetching: false,
	errorMessage: undefined,
}

describe('shopReducer', () => {
	it('should return initial state', () => {
		expect(shopReducer(undefined, {})).toEqual(initialState)
	})

	it('should set isFetching to true if fetchingCollectionsStart action', () => {
		expect(
			shopReducer(initialState, {
				type: FETCH_COLLECTIONS_START,
			}).isFetching
		).toBe(true)
	})

	it('should set isFetching to false and collections to payload if fetchingCollectionsSuccess', () => {
		const mockItems = [{ id: 1 }, { id: 2 }]
		expect(
			shopReducer(initialState, {
				type: FETCH_COLLECTIONS_SUCCESS,
				payload: mockItems,
			})
		).toEqual({
			...initialState,
			isFetching: false,
			collections: mockItems,
		})
	})

	it('should set isFetching to false and error to the payload if fetchingCollectionsFail', () => {
		expect(
			shopReducer(initialState, {
				type: FETCH_COLLECTIONS_FAIL,
				payload: 'error',
			})
		).toEqual({
			...initialState,
			isFetching: false,
			error: 'error',
		})
	})
})
