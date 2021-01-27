import React from 'react'
import { connect } from 'react-redux'
import MenuItem from '../menu-item/MenuItem'
import { createStructuredSelector } from 'reselect'

import { selectDirectorySections } from '../../redux/directory/directorySelectors'

import './Directory.scss'

const Directory = ({ sections }) => {
	return (
		<div className='directory-menu'>
			{/* use the spread operator to destructure the other items in object */}
			{sections.map(({ id, ...otherSectionProps }) => (
				<MenuItem key={id} {...otherSectionProps} />
			))}
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	sections: selectDirectorySections,
})

export default connect(mapStateToProps)(Directory)
