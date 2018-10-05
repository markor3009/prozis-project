import axios from 'axios'

let instance = axios.create({
  baseURL : "http://localhost:8081/api/"
});

export default instance
