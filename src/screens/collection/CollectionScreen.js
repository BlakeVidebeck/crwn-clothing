import React from 'react'
import { connect } from 'react-redux'

import CollectionItem from '../../components/collection-item/CollectionItem'

import { selectCollection } from '../../redux/shop/shopSelectors'

import './CollectionScreen.scss'

const CollectionScreen = ({ collection }) => {
	const { title, items } = collection
	return (
		<div className='collection-screen'>
			<h2 className='title'>{title}</h2>
			<div className='items'>
				{items.map((item) => (
					<CollectionItem
						key={item.id}
						item={item}
						className='collection-item'
					/>
				))}
			</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => ({
	collection: selectCollection(ownProps.match.params.collectionName)(state),
})

export default connect(mapStateToProps)(CollectionScreen)
