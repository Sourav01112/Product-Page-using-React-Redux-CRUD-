import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./actionTypes"
import { saveData, loadData } from '../../Utilities/localStorage'

const inState = {
    isLoading: false,
    isAuth: loadData('token'),
    token: loadData('token') || '',
    isError: false,
    errorMessage: ''
}

export const reducer = (state = inState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case LOGIN_SUCCESS: {

            let newPayLoad = payload
            saveData('token', newPayLoad)
            return {
                ...state,
                isLoading: false,
                isAuth: true,
                token: payload,
                isError: false,
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: payload
            }
        }
        case LOGOUT: {
            localStorage.removeItem('token')
            return { inState }
        }

        default: {
            return state
        }
    }
}