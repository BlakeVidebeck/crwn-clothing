import { takeLatest, put } from 'redux-saga/effects'

import { clearCart } from './cartActions'
import { clearCartOnSignOut, onSignOutSuccess } from './cartSagas'
import { SIGN_OUT_SUCCESS } from '../user/userConstants'

describe('on signout success saga', () => {
	it('should trigger on SIGN_OUT_SUCCESS', async () => {
		const generator = onSignOutSuccess()

		expect(generator.next().value).toEqual(
			takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut)
		)
	})
})

describe('clear cart on signout saga', () => {
	it('should fire clearCart', () => {
		const generator = clearCartOnSignOut()

		expect(generator.next().value).toEqual(put(clearCart()))
	})
})
