import React from 'react'
import { Route } from 'react-router-dom'

import CollectionsOverview from '../../components/collections-overview/CollectionsOverview'
import CollectionScreen from '../collection/CollectionScreen'

const ShopScreen = ({ match }) => {
	return (
		<div className='shop-screen'>
			<Route exact path={`${match.path}`} component={CollectionsOverview} />
			<Route
				path={`${match.path}/:collectionName`}
				component={CollectionScreen}
			/>
		</div>
	)
}

export default ShopScreen
