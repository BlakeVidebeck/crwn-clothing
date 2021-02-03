import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/CartIcon'
import CartDropdown from '../cart-dropdown/CartDropdown'
import { selectCartHidden } from '../../redux/cart/cartSelectors'
import { selectCurrentUser } from '../../redux/user/userSelectors'

import { ReactComponent as Logo } from '../../assets/crown.svg'

import {
	HeaderContainer,
	LogoContainer,
	OptionsContainer,
	OptionLink,
} from './HeaderStyles'

const Header = ({ currentUser, hidden }) => {
	return (
		<HeaderContainer>
			<LogoContainer to='/'>
				<Logo className='logo' />
			</LogoContainer>

			<OptionsContainer>
				<OptionLink to='/shop'>SHOP</OptionLink>
				<OptionLink to='/shop'>CONTACT</OptionLink>

				{currentUser ? (
					<OptionLink as='div' onClick={() => auth.signOut()}>
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

export default connect(mapStateToProps)(Header)
