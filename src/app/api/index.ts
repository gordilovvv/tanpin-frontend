import ax from 'axios';

export const axios = ax.create({
    baseURL: 'API_URL',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});
