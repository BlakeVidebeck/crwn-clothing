import React from 'react'
import { shallow } from 'enzyme'
import { CheckoutScreen } from './CheckoutScreen'

let wrapper
beforeEach(() => {
	const mockProps = {
		cartItems: [],
		total: 100,
	}

	wrapper = shallow(<CheckoutScreen {...mockProps} />)
})

it('should render CheckoutScreen component', () => {
	expect(wrapper).toMatchSnapshot()
})
