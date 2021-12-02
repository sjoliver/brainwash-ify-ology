import axios from "axios";

const instance = axios.create({
  
  // baseURL: 'https://brainwash-api.herokuapp.com/',
  baseURL: 'http://localhost:3000/',
  // timeout: 1000
});

export default instance;