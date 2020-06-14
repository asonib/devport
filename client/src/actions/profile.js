import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from './type'

//Get user
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//create or update user
export const createProfile = (formData, history, edit=false) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
          }
    }
    try {
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated': 'Profile Created', 'success'));

        //redirect only if created
        // if(!edit){
        //     history.push('/dashboard');
        // }
        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Add Experience
export const addExperience = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        history.push('/dashboard');

        dispatch(setAlert('Experience Added', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
};

//Add Education
export const addEducation = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        history.push('/dashboard');

        dispatch(setAlert('Education Added', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
};