import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/CartIcon'
import CartDropdown from '../cart-dropdown/CartDropdown'

import { ReactComponent as Logo } from '../../assets/crown.svg'

import './Header.scss'

const Header = ({ currentUser, hidden }) => {
	return (
		<div className='header'>
			<Link to='/' className='logo-container'>
				<Logo className='logo' />
			</Link>

			<div className='options'>
				<Link className='option' to='/shop'>
					SHOP
				</Link>
				<Link className='option' to='/shop'>
					CONTACT
				</Link>

				{currentUser ? (
					<div className='option' onClick={() => auth.signOut()}>
						LOGOUT
					</div>
				) : (
					<Link className='option' to='/login'>
						LOGIN
					</Link>
				)}
				<CartIcon />
			</div>
			{hidden ? null : <CartDropdown />}
		</div>
	)
}

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
	currentUser,
	hidden,
})

export default connect(mapStateToProps)(Header)
