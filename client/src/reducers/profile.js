import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from '../actions/type';

const initialState = {
    profile: null,
    profiles: [],
    repo: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return{
                ...state,
                profile: payload,
                loading: false,
                error: null
            }
        case GET_PROFILES:
            return{
                ...state,
                profiles: payload,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repo: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repo: [],
                error: {}
            }
        default:
            return state
    }
}