import ax from 'axios';
import { API_URL } from '@/config';

export const axios = ax.create({
    baseURL: 'API_URL',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});
