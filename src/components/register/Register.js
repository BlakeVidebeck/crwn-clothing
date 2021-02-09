import React from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import { signUpStart } from '../../redux/user/userActions'

import { RegisterContainer, RegisterTitle } from './RegisterStyles'

class Register extends React.Component {
	constructor() {
		super()

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const { signUpStart } = this.props
		const { displayName, email, password, confirmPassword } = this.state
		if (password !== confirmPassword) {
			alert('passwords do not match')
			return
		}

		signUpStart({ displayName, email, password })
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	render() {
		const { displayName, email, password, confirmPassword } = this.state
		return (
			<RegisterContainer>
				<RegisterTitle>I do not have an account</RegisterTitle>
				<span>Sign up with your email and password</span>
				<form className='sign-up-form' onSubmit={this.handleSubmit}>
					<FormInput
						type='text'
						name='displayName'
						value={displayName}
						onChange={this.handleChange}
						label='Display Name'
						required
					/>
					<FormInput
						type='email'
						name='email'
						value={email}
						onChange={this.handleChange}
						label='Email'
						required
					/>
					<FormInput
						type='password'
						name='password'
						value={password}
						onChange={this.handleChange}
						label='Password'
						required
					/>
					<FormInput
						type='password'
						name='confirmPassword'
						value={confirmPassword}
						onChange={this.handleChange}
						label='Confirm Password'
						required
					/>
					<CustomButton type='submit'>Register</CustomButton>
				</form>
			</RegisterContainer>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	signUpStart: (userData) => dispatch(signUpStart(userData)),
})

export default connect(null, mapDispatchToProps)(Register)
