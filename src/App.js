import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'

import HomeScreen from './screens/homescreen/HomeScreen'
import ShopScreen from './screens/shopscreen/ShopScreen'
import LoginAndRegisterScreen from './screens/LoginAndRegisterScreen/LoginAndRegisterScreen'
import Header from './components/header/Header'
import { auth } from './firebase/firebase.utils'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			currentUser: null,
		}
	}

	// create a new method and set it to null
	unsubscribeFromAuth = null

	// on mount set the unsubscribe method to a function that sets the state of the current user logged in from googleAuth
	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
			this.setState({ currentUser: user })
		})
	}

	// on unmount set unsubscribe method back to null
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
