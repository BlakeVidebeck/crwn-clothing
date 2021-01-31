import React from 'react'
import { connect } from 'react-redux'

import CollectionItem from '../../components/collection-item/CollectionItem'

import { selectCollection } from '../../redux/shop/shopSelectors'

import {
	CollectionScreenContainer,
	CollectionTitle,
	CollectionItemsContainer,
} from './CollectionStyles'

const CollectionScreen = ({ collection }) => {
	const { title, items } = collection
	return (
		<CollectionScreenContainer>
			<CollectionTitle>{title}</CollectionTitle>
			<CollectionItemsContainer>
				{items.map((item) => (
					<CollectionItem
						key={item.id}
						item={item}
						className='collection-item'
					/>
				))}
			</CollectionItemsContainer>
		</CollectionScreenContainer>
	)
}

const mapStateToProps = (state, ownProps) => ({
	collection: selectCollection(ownProps.match.params.collectionName)(state),
})

export default connect(mapStateToProps)(CollectionScreen)
