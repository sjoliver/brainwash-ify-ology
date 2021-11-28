import axios from "axios";

const instance = axios.create({
  baseURL: 'https://brainwash-api.herokuapp.com/',
  timeout: 1000
});

export default instance;