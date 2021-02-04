import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'

import { selectIsCollectionLoaded } from '../../redux/shop/shopSelectors'

import WithSpinner from '../../components/withSpinner/WithSpinner'

import CollectionScreen from './CollectionScreen'

const mapStateToProps = createStructuredSelector({
	isLoading: (state) => !selectIsCollectionLoaded(state),
})

const CollectionContainer = compose(
	connect(mapStateToProps),
	WithSpinner
)(CollectionScreen)

export default CollectionContainer
