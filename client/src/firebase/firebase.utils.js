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

firebase.initializeApp(config)

// finds the user in the db and returns OR creates a new user in the db and returns
export const createUserProfileDocument = async (userAuth, additionalData) => {
	// if userAuth does not exist then return out the function
	if (!userAuth) return

	// get the userRef from the firestore db - users collection
	const userRef = firestore.doc(`users/${userAuth.uid}`)

	// get the user document object
	const snapShot = await userRef.get()

	// if the user document object DOES NOT exist then create a new user
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
	// return the userRef
	return userRef
}

// adds collections / documents to the db
export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	// finds a ref instance that refers to the collection at the speificied path
	const collectionRef = firestore.collection(collectionKey)

	// Creates a write batch, used for performing multiple writes as a single atomic operation.
	const batch = firestore.batch()

	objectsToAdd.forEach((obj) => {
		// make new doc ref onject with random generated key
		const newDocRef = collectionRef.doc()
		// add all the new docs into a batch call
		batch.set(newDocRef, obj)
	})

	// fire off batch request and returns a promise
	return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map((doc) => {
		const { title, items } = doc.data()

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items,
		}
	})

	// turn the array of collections into an object of collection objects
	return transformedCollection.reduce((acc, collection) => {
		acc[collection.title.toLowerCase()] = collection
		return acc
	}, {})
}

// get the current user
export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			unsubscribe()
			resolve(userAuth)
		}, reject)
	})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// google auth util
export const googleProvider = new firebase.auth.GoogleAuthProvider()
// always prompt with select account when connecting google
googleProvider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase
