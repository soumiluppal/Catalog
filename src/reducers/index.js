import { combineReducers } from 'redux';
import catReducer from './categories.reducer';
import modalReducer from './modal.reducer';

export default combineReducers({
    catReducer,
    modalReducer
});