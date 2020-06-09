import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_FAIL,
    USER_LOADED
} from './type';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_FAIL
        });
    }
}

//Register User
export const register = ({name, email, password}) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
              }
        }
        const body = JSON.stringify({name, email, password});
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }

}