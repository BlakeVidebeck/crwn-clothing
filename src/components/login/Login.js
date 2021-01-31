import React from 'react'

import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

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
		const { email, password } = this.state
		try {
			await auth.signInWithEmailAndPassword(email, password)
			this.setState({ email: '', password: '' })
		} catch (error) {
			console.error(error)
		}
	}

	render() {
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
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
							Sign in with Google
						</CustomButton>
					</ButtonsBarContainer>
				</form>
			</LoginContainer>
		)
	}
}

export default Login
