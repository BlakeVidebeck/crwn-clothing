import React from 'react'

import CustomButton from '../custom-button/CustomButton'

import './CartDropdown.scss'

const CartDropdown = () => {
	return (
		<div class='cart-dropdown'>
			<div className='cart-items' />
			<CustomButton>GO TO CHECKOUT</CustomButton>{' '}
		</div>
	)
}

export default CartDropdown
