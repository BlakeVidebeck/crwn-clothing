import React, { useEffect, lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Header from './components/header/Header'
import Spinner from './components/spinner/Spinner'
import ErrorBoundary from './components/errorBoundary/ErrorBoundary'

import { GlobalStyle } from './globalStyles'

import { selectCurrentUser } from './redux/user/userSelectors'
import { checkUserSession } from './redux/user/userActions'

// lazy loading
const HomeScreen = lazy(() => import('./screens/homescreen/HomeScreen'))
const ShopScreen = lazy(() => import('./screens/shopscreen/ShopScreen'))
const LoginAndRegisterScreen = lazy(() =>
	import('./screens/LoginAndRegisterScreen/LoginAndRegisterScreen')
)
const CheckoutScreen = lazy(() => import('./screens/checkout/CheckoutScreen'))

const App = ({ checkUserSession, currentUser }) => {
	useEffect(() => {
		checkUserSession()
	}, [checkUserSession])

	return (
		<>
			<GlobalStyle />
			<Header />
			<Switch>
				<ErrorBoundary>
					<Suspense fallback={<Spinner />}>
						<Route exact path='/checkout' component={CheckoutScreen} />
						<Route path='/shop' component={ShopScreen} />
						<Route
							exact
							path='/login'
							render={() =>
								currentUser ? <Redirect to='/' /> : <LoginAndRegisterScreen />
							}
						/>
						<Route exact path='/' component={HomeScreen} />
					</Suspense>
				</ErrorBoundary>
			</Switch>
		</>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSession()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
