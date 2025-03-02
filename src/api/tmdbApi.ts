import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_APP_TMDB_ACCESS_KEY}`
    },
});

// console.log(import.meta.env.VITE_APP_TMDB_ACCESS_KEY);

export default apiClient;