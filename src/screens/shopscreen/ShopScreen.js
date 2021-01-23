import { Component } from 'react'
import SHOP_DATA from './shopdata'

import CollectionPreview from '../../components/collection-preview/CollectionPreview'

class ShopScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			collections: SHOP_DATA,
		}
	}

	render() {
		const { collections } = this.state
		return (
			<div className='shop-page'>
				{collections.map(({ id, ...otherCollectionProps }) => (
					<CollectionPreview key={id} {...otherCollectionProps} />
				))}
			</div>
		)
	}
}

export default ShopScreen
