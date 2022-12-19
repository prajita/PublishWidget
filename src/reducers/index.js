import initialState from './initialState';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
    UPDATE_CREATE_WIDGET_MODAL,
    FETCH_WIDGETS,
    UPDATE_LOADER
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
