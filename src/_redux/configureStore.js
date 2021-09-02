import { createStore, combineReducers, applyMiddleware } from 'redux';


import thunk from 'redux-thunk';
import logger from 'redux-logger';
import FormData from './reducer/formData';


export const ConfigureStore = () => {
	let middleware = process.env.NODE_ENV === 'development' ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);

    const appReducer = combineReducers({
		FormData: FormData,
    });


	const rootReducer = (state, action) => {
		return appReducer(state, action)
	}

	const store = createStore(
		rootReducer,
		middleware
	);
	return store;
}