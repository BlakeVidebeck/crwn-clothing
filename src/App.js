import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'

import HomeScreen from './screens/HomeScreen'

function App() {
	return (
		<>
			<Switch>
				<Route exact path='/shop/hats' render={() => <h1>Hats page</h1>} />
				<Route exact path='/' component={HomeScreen} />
			</Switch>
		</>
	)
}

export default App
