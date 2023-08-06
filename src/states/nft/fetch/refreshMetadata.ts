import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';

export async function refreshMetadata(nftID: string) {
    if (MOCK_API_CALLS) {
        await new Promise<void>(r => setTimeout(r, 300));
    }

    await api.get(`/token/refresh/${nftID}`);
}