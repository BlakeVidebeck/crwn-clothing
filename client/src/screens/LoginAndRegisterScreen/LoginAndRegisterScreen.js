import React from 'react'

import Login from '../../components/login/Login'
import Register from '../../components/register/Register'

import { LoginAndRegisterContainer } from './LoginAndRegisterScreenStyles'

const LoginAndRegisterScreen = () => {
	return (
		<LoginAndRegisterContainer>
			<Login />
			<Register />
		</LoginAndRegisterContainer>
	)
}

export default LoginAndRegisterScreen
