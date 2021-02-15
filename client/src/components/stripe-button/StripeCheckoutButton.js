import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
	// stripe wants the price in cents
	const priceForStripe = price * 100
	const publishableKey =
		'pk_test_51HOsNEEyPPY3KneievjLrbiZba6ElTrqHMdPZP0VPhQgt7BRpHN6mJTDhBmovqkoNeKPXrwTFSUKN4aBjYxddplC00S5CJGUV8'

	const onToken = (token) => {
		axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token,
			},
		})
			.then((res) => {
				alert('Payment successful')
			})
			.catch((error) => {
				console.log(`Payment error: ${error}`)
				alert(
					'There was an issue with your payment, Please make sure you use provided credit card'
				)
			})
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
