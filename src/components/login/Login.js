import React from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import {
	googleSignInStart,
	emailSignInStart,
} from '../../redux/user/userActions'

import { LoginContainer, LoginTitle, ButtonsBarContainer } from './LoginStyles'
class Login extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
		}
	}

	handleChange = (e) => {
		const { value, name } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const { emailSignInStart } = this.props
		const { email, password } = this.state

		emailSignInStart(email, password)
	}

	render() {
		const { googleSignInStart } = this.props
		return (
			<LoginContainer>
				<LoginTitle>I already have an account</LoginTitle>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						type='email'
						label={'email'}
						name='email'
						value={this.state.email}
						handleChange={this.handleChange}
						required
					/>
					<FormInput
						type='password'
						label={'password'}
						name='password'
						value={this.state.password}
						onChange={this.handleChange}
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
}

const mapDispatchToProps = (dispatch) => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) =>
		dispatch(emailSignInStart({ email, password })),
})

export default connect(null, mapDispatchToProps)(Login)
