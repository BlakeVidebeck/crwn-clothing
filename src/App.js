import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'

import HomeScreen from './screens/homescreen/HomeScreen'
import ShopScreen from './screens/shopscreen/ShopScreen'
import LoginAndRegisterScreen from './screens/LoginAndRegisterScreen/LoginAndRegisterScreen'
import Header from './components/header/Header'

function App() {
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

export default App
