import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './App.css'

import HomeScreen from './screens/homescreen/HomeScreen'
import ShopScreen from './screens/shopscreen/ShopScreen'
import LoginAndRegisterScreen from './screens/LoginAndRegisterScreen/LoginAndRegisterScreen'
import CheckoutScreen from './screens/checkout/CheckoutScreen'

import Header from './components/header/Header'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

import { setCurrentUser } from './redux/user/userActions'
import { selectCurrentUser } from './redux/user/userSelectors'

class App extends React.Component {
	unsubscribeFromAuth = null

	componentDidMount() {
		const { setCurrentUser } = this.props
		// if the auth state changes then pass userAuth object
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			// if auth state changes then create a user profile
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth)
				// whenever the document snapshot changes then set the state to the userRef
				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					})
				})
			}
			// sets the state of the current user
			setCurrentUser(userAuth)
		})
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth()
	}

	render() {
		return (
			<>
				<Header />
				<Switch>
					<Route exact path='/checkout' component={CheckoutScreen} />
					<Route path='/shop' component={ShopScreen} />
					<Route
						exact
						path='/login'
						render={() =>
							this.props.currentUser ? (
								<Redirect to='/' />
							) : (
								<LoginAndRegisterScreen />
							)
						}
					/>
					<Route exact path='/' component={HomeScreen} />
				</Switch>
			</>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
