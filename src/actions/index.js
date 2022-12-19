import {
    fetchWidgetsApi,
    createWidgetApi,
    updateWidgetApi
} from '../utils/fetchDetails';

import {
    FETCH_WIDGETS,
    UPDATE_CREATE_WIDGET_MODAL,
    UPDATE_LOADER,
    USER_LOGOUT
} from './actionTypes';

export const userLogout=()=>{
    return {
        type: USER_LOGOUT
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

export const openEditWidgetModal =()=>{
    return function (dispatch) {     
        dispatch({
            type: UPDATE_CREATE_WIDGET_MODAL,
            editWidgetModal: true
        });    
    }
}

export const requestWidgets = () => {

    return function (dispatch) {
        dispatch({
            type: UPDATE_LOADER,
            loader: true
        })
        fetchWidgetsApi((widgets) => {
            dispatch({
                type: FETCH_WIDGETS,
                payload: widgets,
                loading: false
            });
        });
    }
}


export const createWidget = widgetObj => {

    return function (dispatch) {

        Promise.all([
            createWidgetApi(widgetObj, (res) => {
                console.log("create widget success:::", res);
            }),

        ]).then(() => {
            fetchWidgetsApi((widgets) => {
                dispatch({
                    type: FETCH_WIDGETS,
                    payload: widgets
                });
            });
        })
    }
}

export const updateWidget = widgetObj => {

    return function (dispatch) {

        Promise.all([
            updateWidgetApi(widgetObj, (res) => {
                console.log("update widget success:::", res);
            }),

        ]).then(() => {
            fetchWidgetsApi((widgets) => {
                dispatch({
                    type: FETCH_WIDGETS,
                    payload: widgets
                });
            });
        })
    }
}

export const closeWidgetModal = () => {
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