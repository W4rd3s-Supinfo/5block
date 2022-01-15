/* eslint-disable no-underscore-dangle */
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
// Reducers

const middlewares = [thunk];

const devtools = process.env.NODE_ENV === 'development' ? (
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
) || compose : (compose);

const rootReducer = combineReducers({

});

const reduxStore = createStore(rootReducer, compose(applyMiddleware(...middlewares), devtools));

export default reduxStore;

export type IReduxStore = ReturnType<typeof rootReducer>
