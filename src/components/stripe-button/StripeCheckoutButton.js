import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
	// stripe wants the price in cents
	const priceForStripe = price * 100
	const publishableKey =
		'pk_test_51HOsNEEyPPY3KneievjLrbiZba6ElTrqHMdPZP0VPhQgt7BRpHN6mJTDhBmovqkoNeKPXrwTFSUKN4aBjYxddplC00S5CJGUV8'

	const onToken = (token) => {
		console.log(token)
		alert('Payment Successful')
	}

	return (
		<StripeCheckout
			label='Pay Now'
			name='CRWN Clothing Ltd'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.svg'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	)
}

export default StripeCheckoutButton
