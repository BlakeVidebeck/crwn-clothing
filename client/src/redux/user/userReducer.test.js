import {
	SIGN_IN_FAIL,
	SIGN_IN_SUCCESS,
	SIGN_OUT_FAIL,
	SIGN_OUT_SUCCESS,
	SIGN_UP_FAIL,
} from './userConstants'
import userReducer from './userReducer'

const initialState = {
	currentUser: null,
	error: null,
}

describe('userReducer', () => {
	it('should return intial state', () => {
		expect(userReducer(undefined, {})).toEqual(initialState)
	})

	it('should set currentUser to payload on signInSuccess action', () => {
		const mockUser = { id: 1, displayName: 'Blake' }

		expect(
			userReducer(initialState, {
				type: SIGN_IN_SUCCESS,
				payload: mockUser,
			}).currentUser
		).toEqual(mockUser)
	})

	it('should set currentUser to null on signOutSuccess action', () => {
		expect(
			userReducer(initialState, {
				type: SIGN_OUT_SUCCESS,
			}).currentUser
		).toBe(null)
	})

	it('should st errorMessage to payload on signInFail, signUpFail, signOutFail action', () => {
		const mockError = {
			message: 'error',
			code: 404,
		}

		expect(
			userReducer(initialState, {
				type: SIGN_IN_FAIL,
				payload: mockError,
			}).error
		).toBe(mockError)

		expect(
			userReducer(initialState, {
				type: SIGN_UP_FAIL,
				payload: mockError,
			}).error
		).toBe(mockError)

		expect(
			userReducer(initialState, {
				type: SIGN_OUT_FAIL,
				payload: mockError,
			}).error
		).toBe(mockError)
	})
})
