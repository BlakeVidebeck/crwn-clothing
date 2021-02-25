import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CartIcon from '../cart-icon/CartIcon'
import CartDropdown from '../cart-dropdown/CartDropdown'
import { selectCartHidden } from '../../redux/cart/cartSelectors'
import { selectCurrentUser } from '../../redux/user/userSelectors'
import { signOutStart } from '../../redux/user/userActions'

import { ReactComponent as Logo } from '../../assets/crown.svg'

import {
	HeaderContainer,
	LogoContainer,
	OptionsContainer,
	OptionLink,
} from './HeaderStyles'

export const Header = ({ currentUser, hidden, signOutStart }) => {
	return (
		<HeaderContainer>
			<LogoContainer to='/'>
				<Logo className='logo' />
			</LogoContainer>

			<OptionsContainer>
				<OptionLink to='/shop'>SHOP</OptionLink>
				<OptionLink to='/shop'>CONTACT</OptionLink>

				{currentUser ? (
					<OptionLink as='div' onClick={signOutStart}>
						LOGOUT
					</OptionLink>
				) : (
					<OptionLink to='/login'>LOGIN</OptionLink>
				)}
				<CartIcon />
			</OptionsContainer>
			{hidden ? null : <CartDropdown />}
		</HeaderContainer>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
})

const mapDispatchToProps = (dispatch) => ({
	signOutStart: () => dispatch(signOutStart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
