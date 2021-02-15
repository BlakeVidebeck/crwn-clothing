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
	(collections) =>
		collections ? Object.keys(collections).map((key) => collections[key]) : []
)

// return the collection state where the collectionNameParam (hats) matches the key in the shopdata object
export const selectCollection = memoize((collectionNameParam) =>
	createSelector([selectCollections], (collections) =>
		collections ? collections[collectionNameParam] : null
	)
)

// get the isFetching state from the shop state
export const selectIsCollectionFetching = createSelector(
	[selectShop],
	(shop) => shop.isFetching
)

// see if the shop collections is a boolean value
export const selectIsCollectionLoaded = createSelector(
	[selectShop],
	(shop) => !!shop.collections
)
