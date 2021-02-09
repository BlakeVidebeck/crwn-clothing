import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga)

const persistor = persistStore(store)

export { store, persistor }
