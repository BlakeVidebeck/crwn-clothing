import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CollectionPreview from '../collection-preview/CollectionPreview'

import { selectCollectionsForPreview } from '../../redux/shop/shopSelectors'
import { CollectionsOverviewContainer } from './CollectionsOverviewStyles'

export const CollectionsOverview = ({ collections }) => {
	return (
		<CollectionsOverviewContainer>
			{collections.map(({ id, ...otherCollectionProps }) => (
				<CollectionPreview key={id} {...otherCollectionProps} />
			))}
		</CollectionsOverviewContainer>
	)
}

const mapStateToProps = createStructuredSelector({
	collections: selectCollectionsForPreview,
})

export default connect(mapStateToProps)(CollectionsOverview)
