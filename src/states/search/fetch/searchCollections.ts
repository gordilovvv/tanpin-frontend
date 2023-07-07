import { api } from '@/app/api';
import { MOCK_API_CALLS } from '@/config';

type Response = {
    ID: string
    name: string
    logoURL: string
    gameID: string
}[] | undefined;

export async function searchCollections(query: string, signal?: AbortSignal): Promise<Response> {
    if (MOCK_API_CALLS) {
        await new Promise<void>(r => setTimeout(r, 200));

        if (query === '1') {
            throw new Error('1234');
        }

        return [
            {
                ID: '1',
                name: 'Graffities by rektguy',
                logoURL: 'https://lh3.googleusercontent.com/4CWZrrNgHhB2pCwGS8-Tc2mFZYSyXsWbvu_relvKm7d62rVXodcIlTOpnmoH25RrX2d9ecaFGL1g00v4vhtOpQynWg27-YHGKA=s400',
                gameID: '1'
            }
        ];
    }

    const { data } = await api.get<Response>(
        `/search/collections/${query}`,
        { signal }
    );

    return data;
}