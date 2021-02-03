import React from 'react'

import { SpinnerOverlay, SpinnerContainer } from './WithSpinnerStyles'

const withSpinner = (WrappedComponent) => {
	const Spinner = ({ isLoading, ...otherProps }) => {
		return isLoading ? (
			<SpinnerOverlay>
				<SpinnerContainer />
			</SpinnerOverlay>
		) : (
			<WrappedComponent {...otherProps} />
		)
	}

	return Spinner
}

export default withSpinner
