import React from 'react'
import { shallow } from 'enzyme'

import { CollectionScreen } from './CollectionScreen'
import CollectionItem from '../../components/collection-item/CollectionItem'

describe('CollectionPage', () => {
	let wrapper
	let mockItems = [{ id: 1 }, { id: 2 }, { id: 3 }]

	beforeEach(() => {
		const mockCollection = {
			items: mockItems,
			title: 'Test',
		}

		wrapper = shallow(<CollectionScreen collection={mockCollection} />)
	})

	it('should render the CollectionScreen component', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should render the same number of CollectionItems as collection array', () => {
		expect(wrapper.find(CollectionItem).length).toBe(mockItems.length)
	})
})
