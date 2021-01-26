export const addItemToCart = (cartItems, cartItemToAdd) => {
	// check to see if the new item already exists in the cart
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToAdd.id
	)

	// if existingCartItem exists then create a new array
	// and find the existing cart item and spread in the existing data and add 1 to the quantity of it
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === cartItemToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		)
	}

	// if a new item then the if block will not run and it will return the cartItems as well as a new CartItem
	// with the attached quantity property set to 1
	return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}
