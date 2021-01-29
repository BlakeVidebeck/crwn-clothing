import memoize from 'lodash.memoize'

import { createSelector } from 'reselect'

// return the shop state from the state
const selectShop = (state) => state.shop

// return the collections from the shop state
export const selectCollections = createSelector(
	[selectShop],
	(shop) => shop.collections
)

// turn the shop data object into an array to be able to map through it
export const selectCollectionsForPreview = createSelector(
	[selectCollections],
	(collections) => Object.keys(collections).map((key) => collections[key])
)

// return the collection state where the collectionNameParam (hats) matches the key in the shopdata object
export const selectCollection = memoize((collectionNameParam) =>
	createSelector(
		[selectCollections],
		(collections) => collections[collectionNameParam]
	)
)
