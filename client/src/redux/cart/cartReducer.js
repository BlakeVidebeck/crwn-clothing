import {
	TOGGLE_CART_HIDDEN,
	ADD_ITEM,
	CLEAR_ITEM_FROM_CART,
	REMOVE_ITEM,
	CLEAR_CART,
} from './cartConstants'
import { addItemToCart, removeItemFromCart } from './cartUtils'

const INITIAL_STATE = {
	hidden: true,
	cartItems: [],
}

const cartReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action

	switch (type) {
		case TOGGLE_CART_HIDDEN:
			return {
				...state,
				hidden: !state.hidden,
			}
		case ADD_ITEM:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, payload),
			}

		case REMOVE_ITEM:
			return {
				...state,
				cartItems: removeItemFromCart(state.cartItems, payload),
			}

		case CLEAR_ITEM_FROM_CART:
			return {
				...state,
				// returns a new array with all the items that do not match the payload.id
				cartItems: state.cartItems.filter(
					(cartItem) => cartItem.id !== payload.id
				),
			}
		case CLEAR_CART:
			return {
				...state,
				cartItems: [],
			}
		default:
			return state
	}
}

export default cartReducer
