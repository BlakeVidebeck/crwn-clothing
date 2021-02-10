import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import { signUpStart } from '../../redux/user/userActions'

import { RegisterContainer, RegisterTitle } from './RegisterStyles'

const Register = ({ signUpStart }) => {
	const [credentials, setCredentials] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const { displayName, email, password, confirmPassword } = credentials

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			alert('passwords do not match')
			return
		}
		signUpStart({ displayName, email, password })
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setCredentials({ ...credentials, [name]: value })
	}

	return (
		<RegisterContainer>
			<RegisterTitle>I do not have an account</RegisterTitle>
			<span>Sign up with your email and password</span>
			<form className='sign-up-form' onSubmit={handleSubmit}>
				<FormInput
					type='text'
					name='displayName'
					value={displayName}
					onChange={handleChange}
					label='Display Name'
					required
				/>
				<FormInput
					type='email'
					name='email'
					value={email}
					onChange={handleChange}
					label='Email'
					required
				/>
				<FormInput
					type='password'
					name='password'
					value={password}
					onChange={handleChange}
					label='Password'
					required
				/>
				<FormInput
					type='password'
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
					label='Confirm Password'
					required
				/>
				<CustomButton type='submit'>Register</CustomButton>
			</form>
		</RegisterContainer>
	)
}

const mapDispatchToProps = (dispatch) => ({
	signUpStart: (userData) => dispatch(signUpStart(userData)),
})

export default connect(null, mapDispatchToProps)(Register)
