import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CollectionsOverview from '../../components/collections-overview/CollectionsOverview'
import CollectionScreen from '../collection/CollectionScreen'

import {
	firestore,
	convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils'
import { updateCollections } from '../../redux/shop/shopActions'

import WithSpinner from '../../components/withSpinner/WithSpinner'

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionScreenWithSpinner = WithSpinner(CollectionScreen)

class ShopScreen extends React.Component {
	state = {
		loading: true,
	}
	unSubscribeFromSnapshot = null

	componentDidMount() {
		const { updateCollections } = this.props

		const collectionRef = firestore.collection('collections')

		this.unSubscribeFromSnapshot = collectionRef.onSnapshot(
			async (snapshot) => {
				const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
				updateCollections(collectionsMap)
				this.setState({ loading: false })
			}
		)
	}

	render() {
		const { match } = this.props
		const { loading } = this.state
		return (
			<div className='shop-screen'>
				<Route
					exact
					path={`${match.path}`}
					render={(props) => (
						<CollectionOverviewWithSpinner isLoading={loading} {...props} />
					)}
				/>
				<Route
					path={`${match.path}/:collectionName`}
					render={(props) => (
						<CollectionScreenWithSpinner isLoading={loading} {...props} />
					)}
				/>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateCollections: (collectionsMap) =>
		dispatch(updateCollections(collectionsMap)),
})

export default connect(null, mapDispatchToProps)(ShopScreen)
