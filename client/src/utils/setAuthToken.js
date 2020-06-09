import axios from 'axios';

const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['auth'] = token;
    }else{
        delete axios.defaults.headers.common['auth'];
    }
};

export default setAuthToken;