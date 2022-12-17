import {
    api
} from '../utils/fetchDetails';

import {
    FETCH_WIDGETS,
    REQUEST_WIDGETS,
    REQUEST_CREATE_WIDGET,
    UPDATE_CREATE_WIDGET_MODAL,
    USER_LOGOUT
} from './actionTypes';

export const requestWidgets = (username) => {
    return {
        type: REQUEST_WIDGETS,
        isAuthenticated:true,
        username:username,
        loading: true
    }
}
export const userLogout=()=>{
    return {
        type: USER_LOGOUT
    }
}
export const getWidgetsSuccess = (widgets) => {
    return {
        type: FETCH_WIDGETS,
        payload: widgets,
        loading: false
    }
}

export const loadWidgets = (username) => {
    return function (dispatch) {
        dispatch(requestWidgets(username));
        api((widgets) => {
            dispatch(getWidgetsSuccess(widgets));
        });
    }
}

export const openAddWidgetModal = () => {
    return function (dispatch) {     
        dispatch({
            type: UPDATE_CREATE_WIDGET_MODAL,
            addWidgetModal: true

        });    
    }
}

export const closeAddWidgetModal = () => {
    return function (dispatch) {     
        dispatch({
            type: UPDATE_CREATE_WIDGET_MODAL,
            addWidgetModal: false

        });    
    }
}

export const logoutState=()=>{
    return function(dispatch){
        dispatch(userLogout());
    }
}