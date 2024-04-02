import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';

export async function refreshMetadata(contractAddress: `0x${string}`, tokenID: string) {
    if (MOCK_API_CALLS) {
        return;
    }

    await api.get(`/token/refresh/${contractAddress}:${tokenID}`);
}