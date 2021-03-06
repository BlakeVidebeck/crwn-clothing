import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CheckoutItem from '../../components/checkout-item/CheckoutItem'
import StripeCheckoutButton from '../../components/stripe-button/StripeCheckoutButton'

import {
	selectCartItems,
	selectCartTotal,
} from '../../redux/cart/cartSelectors'

import {
	CheckoutScreenContainer,
	CheckoutHeaderContainer,
	HeaderBlockContainer,
	TotalContainer,
	WarningContainer,
} from './CheckoutStyles'

export const CheckoutScreen = ({ cartItems, total }) => {
	return (
		<CheckoutScreenContainer>
			<CheckoutHeaderContainer>
				<HeaderBlockContainer>
					<span>Product</span>
				</HeaderBlockContainer>

				<HeaderBlockContainer>
					<span>Description</span>
				</HeaderBlockContainer>

				<HeaderBlockContainer>
					<span>Quantity</span>
				</HeaderBlockContainer>

				<HeaderBlockContainer>
					<span>Price</span>
				</HeaderBlockContainer>

				<HeaderBlockContainer>
					<span>Remove</span>
				</HeaderBlockContainer>
			</CheckoutHeaderContainer>
			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}

			<TotalContainer>TOTAL ${total}</TotalContainer>
			<WarningContainer>
				*Please use the following test credit card for payments*
				<br />
				4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
			</WarningContainer>
			<StripeCheckoutButton price={total} />
		</CheckoutScreenContainer>
	)
}

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal,
})

export default connect(mapStateToProps)(CheckoutScreen)
