import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk'
import { bikesReducer, getBikeByIdReducer, bookingReducer, getOrderByIdReducer, orderPayReducer, getOrdersByUserIdReducer } from './reducers/bikeReducer';
import { alertReducer } from './reducers/alertReducer'
import { registerUserReducer, loginUserReducer, updateUserReducer } from './reducers/userReducer';
const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsDenylist, actionsCreators and other options
});


const rootReducer = combineReducers({
    bikesReducer,
    alertReducer,
    registerUserReducer,
    loginUserReducer,
    getBikeByIdReducer,
    bookingReducer,
    getOrderByIdReducer,
    getOrdersByUserIdReducer,
    orderPayReducer,
    updateUserReducer

})
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
        // other store enhancers if any
    )
);

export default store