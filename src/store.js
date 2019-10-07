import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-promise';

import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(ReduxThunk))
);

export default store;
