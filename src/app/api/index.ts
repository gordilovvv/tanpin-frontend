import axios from 'axios';
import { API_URL, GATE_URL } from '@/config';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});


export const gateApi = axios.create({
    baseURL: GATE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
