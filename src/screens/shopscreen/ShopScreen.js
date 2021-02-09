import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer'
import CollectionContainer from '../collection/CollectionContainer'

import { fetchCollectionsStart } from '../../redux/shop/shopActions'

class ShopScreen extends React.Component {
	componentDidMount() {
		const { fetchCollectionsStart } = this.props
		fetchCollectionsStart()
	}

	render() {
		const { match } = this.props
		return (
			<div className='shop-screen'>
				<Route
					exact
					path={`${match.path}`}
					component={CollectionsOverviewContainer}
				/>
				<Route
					path={`${match.path}/:collectionName`}
					component={CollectionContainer}
				/>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
})

export default connect(null, mapDispatchToProps)(ShopScreen)
