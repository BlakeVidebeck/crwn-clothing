import { takeLatest, put, all, call } from 'redux-saga/effects'

import {
	CHECK_USER_SESSION,
	EMAIL_SIGN_IN_START,
	GOOGLE_SIGN_IN_START,
	SIGN_OUT_START,
	SIGN_UP_START,
	SIGN_UP_SUCCESS,
} from './userConstants'

import {
	signInSuccess,
	signInFail,
	signOutSuccess,
	signOutFail,
	signUpFail,
	signUpSuccess,
} from './userActions'

import {
	auth,
	googleProvider,
	createUserProfileDocument,
	getCurrentUser,
} from '../../firebase/firebase.utils'

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userRef = yield call(
			createUserProfileDocument,
			userAuth,
			additionalData
		)
		const userSnapshot = yield userRef.get()
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
	} catch (error) {
		yield put(signInFail(error))
	}
}

// sign up with email
export function* signUp({ payload: { displayName, email, password } }) {
	try {
		const { user } = yield auth.createUserWithEmailAndPassword(email, password)

		yield put(signUpSuccess({ user, additionalData: { displayName } }))
	} catch (error) {
		yield put(signUpFail(error))
	}
}

// after sign up success then login
export function* signInAfterSignOut({ payload: { user, additionalData } }) {
	yield getSnapshotFromUserAuth(user, additionalData)
}

// sign in with google
export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider)
		yield getSnapshotFromUserAuth(user)
	} catch (error) {
		yield put(signInFail(error))
	}
}

// sign in with email
export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password)
		yield getSnapshotFromUserAuth(user)
	} catch (error) {
		yield put(signInFail(error))
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser()
		if (!userAuth) return
		yield getSnapshotFromUserAuth(userAuth)
	} catch (error) {
		yield put(signInFail(error))
	}
}

export function* signOut() {
	try {
		yield auth.signOut()
		yield put(signOutSuccess())
	} catch (error) {
		yield put(signOutFail(error))
	}
}

export function* onSignUpStart() {
	yield takeLatest(SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
	yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignOut)
}

export function* onGoogleSignInStart() {
	yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
	yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
	yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
	yield takeLatest(SIGN_OUT_START, signOut)
}

export function* userSagas() {
	yield all([
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(isUserAuthenticated),
		call(onSignOutStart),
	])
}
