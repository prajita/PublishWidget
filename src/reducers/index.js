import initialState from './initialState';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
    UPDATE_CREATE_WIDGET_MODAL
} from '../actions/actionTypes';


const rootReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_CREATE_WIDGET_MODAL:
            return {
                ...state,
                addWidgetModal: action.addWidgetModal
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
