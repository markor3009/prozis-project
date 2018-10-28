import axios from 'axios'

let instance = axios.create({
  baseURL : "http://46.101.8.242:8081/api/"
});

export default instance
