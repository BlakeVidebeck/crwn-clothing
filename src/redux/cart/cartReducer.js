import { TOGGLE_CART_HIDDEN, ADD_ITEM } from './cartConstants'
import { addItemToCart } from './cartUtils'

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

		default:
			return state
	}
}

export default cartReducer
