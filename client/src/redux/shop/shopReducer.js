import {
	FETCH_COLLECTIONS_START,
	FETCH_COLLECTIONS_SUCCESS,
	FETCH_COLLECTIONS_FAIL,
} from './shopTypes'

const initialState = {
	collections: null,
	isFetching: false,
	error: undefined,
}

export const shopReducer = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case FETCH_COLLECTIONS_START:
			return {
				...state,
				isFetching: true,
			}
		case FETCH_COLLECTIONS_SUCCESS:
			return {
				...state,
				isFetching: false,
				collections: payload,
			}
		case FETCH_COLLECTIONS_FAIL:
			return {
				...state,
				isFetching: false,
				error: payload,
			}
		default:
			return state
	}
}

export default shopReducer
