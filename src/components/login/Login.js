import React from 'react'

import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import './Login.scss'

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

	handleSubmit = (e) => {
		e.preventDefault()
		this.setState({ email: '', password: '' })
	}

	render() {
		return (
			<div className='login'>
				<h2>I already have an account</h2>
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

					<CustomButton type='submit'>Login</CustomButton>
				</form>
			</div>
		)
	}
}

export default Login
