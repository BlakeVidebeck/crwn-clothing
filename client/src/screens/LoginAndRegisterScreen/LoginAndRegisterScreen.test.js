import React from 'react'
import { shallow } from 'enzyme'
import LoginAndRegisterScreen from './LoginAndRegisterScreen'

it('should render LoginAndRegisterScreen component', () => {
	expect(shallow(<LoginAndRegisterScreen />)).toMatchSnapshot()
})
