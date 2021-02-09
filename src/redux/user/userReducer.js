import {
	SIGN_IN_FAIL,
	SIGN_IN_SUCCESS,
	SIGN_OUT_FAIL,
	SIGN_OUT_SUCCESS,
} from './userConstants'

const INITIAL_STATE = {
	currentUser: null,
}

const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action

	switch (type) {
		case SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: payload,
				error: null,
			}
		case SIGN_OUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				error: null,
			}
		case SIGN_IN_FAIL:
		case SIGN_OUT_FAIL:
			return {
				...state,
				error: payload,
			}
		default:
			return state
	}
}

export default userReducer
