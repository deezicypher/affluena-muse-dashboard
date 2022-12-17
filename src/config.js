import axios from "axios";
//baseURL: 'http://127.0.0.1:8000/'

const instance = axios.create({
    baseURL: '/'
  });
export default instance;