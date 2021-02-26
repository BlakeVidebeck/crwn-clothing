import React, { useEffect, lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchCollectionsStart } from '../../redux/shop/shopActions'
import Spinner from '../../components/spinner/Spinner'

import { ShopPageContainer } from './ShopStyles'

const CollectionsOverviewContainer = lazy(() =>
	import('../../components/collections-overview/CollectionsOverviewContainer')
)
const CollectionContainer = lazy(() =>
	import('../collection/CollectionContainer')
)

export const ShopScreen = ({ fetchCollectionsStart, match }) => {
	useEffect(() => {
		fetchCollectionsStart()
	}, [fetchCollectionsStart])

	return (
		<ShopPageContainer>
			<Suspense fallback={<Spinner />}>
				<Route
					exact
					path={`${match.path}`}
					component={CollectionsOverviewContainer}
				/>
				<Route
					path={`${match.path}/:collectionName`}
					component={CollectionContainer}
				/>
			</Suspense>
		</ShopPageContainer>
	)
}

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
})

export default connect(null, mapDispatchToProps)(ShopScreen)
