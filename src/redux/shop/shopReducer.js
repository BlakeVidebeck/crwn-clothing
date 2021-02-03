import { UPDATE_COLLECTIONS } from './shopTypes'

const initialState = {
	collections: null,
}

const shopReducer = (state = initialState, action) => {
	const { type, payload } = action
	switch (type) {
		case UPDATE_COLLECTIONS:
			return {
				...state,
				collections: payload,
			}
		default:
			return state
	}
}

export default shopReducer
