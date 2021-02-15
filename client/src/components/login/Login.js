import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import {
	googleSignInStart,
	emailSignInStart,
} from '../../redux/user/userActions'

import { LoginContainer, LoginTitle, ButtonsBarContainer } from './LoginStyles'
const Login = ({ googleSignInStart, emailSignInStart }) => {
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	})
	const { email, password } = credentials

	const handleSubmit = async (e) => {
		e.preventDefault()
		emailSignInStart(email, password)
	}

	const handleChange = (e) => {
		const { value, name } = e.target
		setCredentials({ ...credentials, [name]: value })
	}

	return (
		<LoginContainer>
			<LoginTitle>I already have an account</LoginTitle>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					type='email'
					label={'email'}
					name='email'
					value={email}
					handleChange={handleChange}
					required
				/>
				<FormInput
					type='password'
					label={'password'}
					name='password'
					value={password}
					onChange={handleChange}
					handleChange
				/>
				<ButtonsBarContainer>
					<CustomButton type='submit'>Login</CustomButton>
					<CustomButton
						type='button'
						onClick={googleSignInStart}
						isGoogleSignIn
					>
						Sign in with Google
					</CustomButton>
				</ButtonsBarContainer>
			</form>
		</LoginContainer>
	)
}

const mapDispatchToProps = (dispatch) => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) =>
		dispatch(emailSignInStart({ email, password })),
})

export default connect(null, mapDispatchToProps)(Login)
