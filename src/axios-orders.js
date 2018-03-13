import axios from 'axios';

const instance= axios.create({
    baseURL:"https://customiseburgerapp.firebaseio.com/"
});

export default instance;