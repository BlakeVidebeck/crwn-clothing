import React from 'react'

import Login from '../../components/login/Login'
import Register from '../../components/register/Register'

import './LoginAndRegisterScreen.scss'

const LoginAndRegisterScreen = () => {
	return (
		<div className='loginandregister'>
			<Login />
			<Register />
		</div>
	)
}

export default LoginAndRegisterScreen
