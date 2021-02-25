import React from 'react'
import { shallow } from 'enzyme'

import { Header } from './Header'
import CartDropdown from '../cart-dropdown/CartDropdown'

describe('Header component', () => {
	let wrapper
	let mockSignOutStart

	beforeEach(() => {
		mockSignOutStart = jest.fn()

		const mockProps = {
			hidden: true,
			currentUser: {
				uid: '123',
			},
			signOutStart: mockSignOutStart,
		}

		wrapper = shallow(<Header {...mockProps} />)
	})

	it('should render Header component', () => {
		expect(wrapper).toMatchSnapshot()
	})

	describe('if currentUser is present', () => {
		it('should render Logout link', () => {
			expect(wrapper.find('OptionLink').at(2).text()).toBe('LOGOUT')
		})

		it('should call SignOutStart method when link is clicked', () => {
			wrapper.find('OptionLink').at(2).simulate('click')
			expect(mockSignOutStart).toHaveBeenCalled()
		})
	})

	describe('if currentUser is null', () => {
		it('should render login link', () => {
			const mockProps = {
				hidden: true,
				currentUser: null,
				signOutStart: mockSignOutStart,
			}

			const newWrapper = shallow(<Header {...mockProps} />)

			expect(newWrapper.find('OptionLink').at(2).text()).toBe('LOGIN')
		})
	})

	describe('if hidden is true', () => {
		it('should not render CartDropdown', () => {
			expect(wrapper.exists(CartDropdown)).toBe(false)
		})
	})

	describe('if hidden is false', () => {
		it('should render CartDropdown', () => {
			const mockProps = {
				hidden: false,
				currentUser: null,
				signOutStart: mockSignOutStart,
			}

			const newWrapper = shallow(<Header {...mockProps} />)

			expect(newWrapper.exists(CartDropdown)).toBe(true)
		})
	})
})
