import {
    fetchWidgetsApi,
    createWidgetApi,
    updateWidgetApi,
    deleteWidgetApi,
    approveWidgetApi,
    publishWidgetApi,
    rejectWidgetApi,
    requestLoginApi
} from '../utils/fetchDetails';

import {
    FETCH_WIDGETS,
    UPDATE_CREATE_WIDGET_MODAL,
    UPDATE_LOADER,
    USER_LOGOUT,
    LOGIN_ERROR,
    USER_LOGIN
} from './actionTypes';


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
            setTimeout(()=>fetchWidgetsApi((widgets) => {
                dispatch({
                    type: FETCH_WIDGETS,
                    payload: widgets
                });
            }),20);
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

export const deleteWidget = widgetId =>{
    return function (dispatch) {

        Promise.all([
            deleteWidgetApi(widgetId, (res) => {
                console.log("delete widget success:::", res);
            }),

        ]).then(() => {
            setTimeout(()=>fetchWidgetsApi((widgets) => {
                dispatch({
                    type: FETCH_WIDGETS,
                    payload: widgets
                });
            }),20);
        })
    }
}

export const publishWidget = widgetId =>{
    return function (dispatch) {

        Promise.all([
            publishWidgetApi(widgetId, (res) => {
                console.log("publish widget success:::", res);
            }),

        ]).then(() => {
            setTimeout(()=>fetchWidgetsApi((widgets) => {
                dispatch({
                    type: FETCH_WIDGETS,
                    payload: widgets
                });
            }),10);
        })
    }
}
export const approveWidget = widgetId =>{
    return function (dispatch) {

        Promise.all([
            approveWidgetApi(widgetId, (res) => {
                console.log("approve widget success:::", res);
            }),

        ]).then(() => {
            setTimeout(()=>fetchWidgetsApi((widgets) => {
                dispatch({
                    type: FETCH_WIDGETS,
                    payload: widgets
                });
            }),20);
        })
    }
}

export const rejectWidget = widgetId =>{
    return function (dispatch) {

        Promise.all([
            rejectWidgetApi(widgetId, (res) => {
                console.log("reject widget success:::", res);
            }),

        ]).then(() => {
            setTimeout(()=>fetchWidgetsApi((widgets) => {
                dispatch({
                    type: FETCH_WIDGETS,
                    payload: widgets
                });
            }),20);
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
export const requestLogin = (reqObj) => {
    return function(dispatch){
        
        requestLoginApi(reqObj, (res) => {
            console.log("login api resp::", res);

            if(!res.error && res.message){
                dispatch({
                    type: USER_LOGIN,
                    user: res.user,
                    isAuthenticated: true,
                    loginError:""
                }); 
            }else{
                dispatch({
                    type: LOGIN_ERROR,
                    loginError:res.error,
                    isAuthenticated: false
                })
            }
        });
        
    }
}

export const requestLogout = (reqObj) => {
    return function(dispatch){
        
        dispatch({
            type: USER_LOGOUT,
            loginError: "",
            isAuthenticated: false
        })
    }
}
