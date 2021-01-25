import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'

import HomeScreen from './screens/homescreen/HomeScreen'
import ShopScreen from './screens/shopscreen/ShopScreen'
import LoginAndRegisterScreen from './screens/LoginAndRegisterScreen/LoginAndRegisterScreen'
import Header from './components/header/Header'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			currentUser: null,
		}
	}

	unsubscribeFromAuth = null

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth)

				userRef.onSnapshot((snapShot) => {
					this.setState({
						currentUser: {
							id: snapShot.id,
							...snapShot.data(),
						},
					})
				})
			} else {
				this.setState({ currentUser: userAuth })
			}
		})
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth()
	}

	render() {
		return (
			<>
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path='/shop' component={ShopScreen} />
					<Route exact path='/login' component={LoginAndRegisterScreen} />
					<Route exact path='/' component={HomeScreen} />
				</Switch>
			</>
		)
	}
}

export default App
