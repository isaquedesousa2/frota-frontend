import axios from 'axios';
import { getTokenCookie } from './token';

export const getAPIServer = () => {
    const token = getTokenCookie();

    const api = axios.create({
        baseURL: process.env.URL_BACKEND,
    });

    api.defaults.headers['refer'] = '3da1r4@#@';

    if (token) {
        api.defaults.headers['Authorization'] = 'Bearer ' + token;
    }

    return api;
};
