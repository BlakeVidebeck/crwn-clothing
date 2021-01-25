import firebase from 'firebase/app'

// import auth method from firebase
import 'firebase/auth'
// import storage method from firebase
import 'firebase/firestore'

const config = {
	apiKey: 'AIzaSyCS5vtqAq-RppmYdXOJYrwzLa_ae-PuLbA',
	authDomain: 'crwn-clothing-3dc79.firebaseapp.com',
	projectId: 'crwn-clothing-3dc79',
	storageBucket: 'crwn-clothing-3dc79.appspot.com',
	messagingSenderId: '681155957711',
	appId: '1:681155957711:web:b0e3965c069cd6928a78ba',
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
	// if userAuth does not exist then return out the function
	if (!userAuth) return

	const userRef = firestore.doc(`users/${userAuth.uid}`)

	const snapShot = await userRef.get()

	if (!snapShot.exists) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			})
		} catch (error) {
			console.log('error creating user', error.message)
		}
	}

	return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// google auth util
const provider = new firebase.auth.GoogleAuthProvider()
// always prompt with select account when connecting google
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
