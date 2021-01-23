import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'

import HomeScreen from './screens/homescreen/HomeScreen'
import ShopScreen from './screens/shopscreen/ShopScreen'

function App() {
	return (
		<>
			<Switch>
				<Route exact path='/shop' component={ShopScreen} />
				<Route exact path='/' component={HomeScreen} />
			</Switch>
		</>
	)
}

export default App
