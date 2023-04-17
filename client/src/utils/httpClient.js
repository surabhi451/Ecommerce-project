import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://localhost:7062/',
   
});

export default httpClient;