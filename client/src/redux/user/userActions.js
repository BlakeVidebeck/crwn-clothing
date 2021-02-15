import {
	CHECK_USER_SESSION,
	EMAIL_SIGN_IN_START,
	GOOGLE_SIGN_IN_START,
	SIGN_IN_FAIL,
	SIGN_IN_SUCCESS,
	SIGN_OUT_FAIL,
	SIGN_OUT_START,
	SIGN_OUT_SUCCESS,
	SIGN_UP_FAIL,
	SIGN_UP_START,
	SIGN_UP_SUCCESS,
} from './userConstants'

export const signUpStart = (userData) => ({
	type: SIGN_UP_START,
	payload: userData,
})

export const signUpSuccess = ({ user, additionalData }) => ({
	type: SIGN_UP_SUCCESS,
	payload: { user, additionalData },
})

export const signUpFail = (error) => ({
	type: SIGN_UP_FAIL,
	payload: error,
})

export const googleSignInStart = () => ({
	type: GOOGLE_SIGN_IN_START,
})

export const emailSignInStart = (emailAndPassword) => ({
	type: EMAIL_SIGN_IN_START,
	payload: emailAndPassword,
})

export const signInSuccess = (user) => ({
	type: SIGN_IN_SUCCESS,
	payload: user,
})

export const signInFail = (error) => ({
	type: SIGN_IN_FAIL,
	payload: error,
})

export const checkUserSession = () => ({
	type: CHECK_USER_SESSION,
})

export const signOutStart = () => ({
	type: SIGN_OUT_START,
})

export const signOutSuccess = () => ({
	type: SIGN_OUT_SUCCESS,
})

export const signOutFail = (error) => ({
	type: SIGN_OUT_FAIL,
	payload: error,
})
