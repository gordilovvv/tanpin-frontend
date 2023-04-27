import { axios } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';

export async function acceptRules() {
    if (MOCK_API_CALLS) {
        return await new Promise<void>(r => setTimeout(r, 250));
    }

    return axios.get('/user.acceptRules');
}