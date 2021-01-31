import React from 'react'
import { connect } from 'react-redux'
import MenuItem from '../menu-item/MenuItem'
import { createStructuredSelector } from 'reselect'

import { selectDirectorySections } from '../../redux/directory/directorySelectors'

import { DirectoryMenuContainer } from './DirectoryStyles'

const Directory = ({ sections }) => {
	return (
		<DirectoryMenuContainer>
			{/* use the spread operator to destructure the other items in object */}
			{sections.map(({ id, ...otherSectionProps }) => (
				<MenuItem key={id} {...otherSectionProps} />
			))}
		</DirectoryMenuContainer>
	)
}

const mapStateToProps = createStructuredSelector({
	sections: selectDirectorySections,
})

export default connect(mapStateToProps)(Directory)
