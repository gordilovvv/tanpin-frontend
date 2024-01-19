import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';

export async function loginWeb3(body: {
    address: string,
    message: string,
    signature: string
}) {
    if (MOCK_API_CALLS) {
        await new Promise<void>(r => setTimeout(r, 200));

        return {
            accessToken: 'testToken',
            rulesAccept: false
        };
    }

    const { data } = await api.post<{
        accessToken: string
        rulesAccept: boolean
    }>('/auth/login.web3', body);

    return data;
}