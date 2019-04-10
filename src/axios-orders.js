import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-react-c5df6.firebaseio.com'
});

export default instance;