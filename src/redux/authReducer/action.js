
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./actionTypes";
import axios from "axios";


export const loginACtion = (userData) => async (dispatch) => {

    try {
        dispatch({ type: LOGIN_REQUEST })
        return axios.post(`https://reqres.in/api/login`, userData).then((res) => {
            // console.log(res.data.token);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data.token })
        })
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message })
    }
}

export const logoutAction = (dispatch) => {
    return dispatch({ type: LOGOUT })
}