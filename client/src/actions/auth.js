import axios from 'axios';
import {setAlert} from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';
//load user
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    } 
    try {
        const res = await axios.get('http://127.0.0.1:5000/api/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//register user
export const register = ({name, email , password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json',
        }
    }
    const body = JSON.stringify({name, email, password})

    try {
        const res = await axios.post('http://127.0.0.1:5000/api/users', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (e) {
        const erros = e.response.data.erros
        if(erros) {
            erros.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

//login user
export const login = (email , password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json',
        }
    }
    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post('http://127.0.0.1:5000/api/auth', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (e) {
        const erros = e.response.data.erros
        if(erros) {
            erros.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//logout /clear
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT})
}