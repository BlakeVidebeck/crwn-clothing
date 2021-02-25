import React from 'react'

import { CustomButtonContainer } from './CustomButtonStyles'

export const CustomButton = ({ children, ...props }) => {
	return <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
}

export default CustomButton
