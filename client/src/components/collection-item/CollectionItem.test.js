import React from 'react'
import { shallow } from 'enzyme'

import { CollectionItem } from './CollectionItem'

describe('CollectionItem component', () => {
	let wrapper
	let mockAddItem
	const mockImageUrl = 'www.testImage.com'
	const mockPrice = 10
	const mockName = 'hats'

	beforeEach(() => {
		mockAddItem = jest.fn()

		const mockProps = {
			item: {
				imageUrl: mockImageUrl,
				price: mockPrice,
				name: mockName,
			},
			addItem: mockAddItem,
		}

		wrapper = shallow(<CollectionItem {...mockProps} />)
	})

	it('should render CollectionItem component', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should call addItem when AddButton is clicked', () => {
		wrapper.find('AddButton').simulate('click')
		expect(mockAddItem).toHaveBeenCalled()
	})

	it('should render imageUrl as a prop on BackgroundImage', () => {
		expect(wrapper.find('BackgroundImage').prop('imageUrl')).toBe(mockImageUrl)
	})

	it('should render name prop in NameContainer', () => {
		expect(wrapper.find('NameContainer').text()).toBe(mockName)
	})

	it('should render price prop in PriceContainer', () => {
		const price = parseInt(wrapper.find('PriceContainer').text())
		expect(price).toBe(mockPrice)
	})
})
