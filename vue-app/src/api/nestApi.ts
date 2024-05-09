import axios from 'axios';

const nestApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default nestApi;