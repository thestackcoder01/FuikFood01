import axios from 'axios';


const instance = axios.create({
    baseURL : 'https://fuikfoodapi.herokuapp.com/'
})

export default instance;