import React from 'react'
import { shallow } from 'enzyme'
import HomeScreen from './HomeScreen'

it('should render HomeScreen component', () => {
	expect(shallow(<HomeScreen />)).toMatchSnapshot()
})
