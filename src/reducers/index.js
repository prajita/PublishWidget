import initialState from './initialState';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
    UPDATE_CREATE_WIDGET_MODAL,
    FETCH_WIDGETS,
    UPDATE_LOADER,
    USER_LOGIN,
    USER_LOGOUT,
    LOGIN_ERROR
} from '../actions/actionTypes';


const rootReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_CREATE_WIDGET_MODAL:
            return {
                ...state,
                addWidgetModal: action.addWidgetModal,
                editWidgetModal: action.editWidgetModal
            };
        case UPDATE_LOADER:
            return {
                ...state,
                loading: action.loading
            };
        case FETCH_WIDGETS:
            return {
                ...state,
                loading: action.loading,
                widgets: action.payload
            };
        case USER_LOGIN:
            return{
                isAuthenticated: action.isAuthenticated,
                user: action.user,
                loginError: action.loginError
            }
        case USER_LOGOUT:
            return {
                isAuthenticated: action.isAuthenticated,
                user: action.user
            }
        case LOGIN_ERROR:
            return{
                isAuthenticated: action.isAuthenticated,
                loginError: action.loginError
            }

        default:
            return state;
    }
};

const persistConfig = {
    key: 'root',
    storage,
    whiteList: [rootReducer],
    blackList: []
}
export default persistReducer(persistConfig, rootReducer);
