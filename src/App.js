import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

import HomeScreen from './screens/homescreen/HomeScreen'
import ShopScreen from './screens/shopscreen/ShopScreen'
import LoginAndRegisterScreen from './screens/LoginAndRegisterScreen/LoginAndRegisterScreen'
import Header from './components/header/Header'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/userActions'

class App extends React.Component {
	unsubscribeFromAuth = null

	componentDidMount() {
		const { setCurrentUser } = this.props
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth)

				userRef.onSnapshot((snapShot) => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					})
				})
			} else {
				setCurrentUser(userAuth)
			}
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
					<Route exact path='/shop' component={ShopScreen} />
					<Route exact path='/login' component={LoginAndRegisterScreen} />
					<Route exact path='/' component={HomeScreen} />
				</Switch>
			</>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(null, mapDispatchToProps)(App)
