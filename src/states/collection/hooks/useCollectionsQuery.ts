import useSWR from 'swr';

type CollectionQueryBody = Partial<{
    filter: Partial<{
        gameID: string,
        search: string,
        sort: 'TRENDING' | 'RECENTLY_ADDED',
        popular: boolean,
    }>,
    pageNum: number,
}>

type CollectionResponse = {
    page: number;
    countPage: number;
    collections: Collection[];
}

type Collection = {
    ID: string;
    name: string;
    symbol: string;
    description: string;
    logoURL: string;
    coverURL: string;
    stats: {
        items: number
        sales: number
        volume: {
            amount: string
            currency: 'USDT' | 'CUSTOM_TOKEN'
        }
        floor: {
            amount: string
            currency: 'USDT' | 'CUSTOM_TOKEN'
        }
    },
    attributes: {
        traitType: string
        values: string[]
    }[]
}

const collectionsFethcer = async (body: CollectionQueryBody): Promise<CollectionResponse> => {
    // TODO: fix URL
    const result = await fetch('/collections.get.list', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });
    if (!result.ok) {
        throw new Error(await result.text());
    }
    const collectionResponse = (await result.json()) as CollectionResponse;
    return collectionResponse;
};

export const useCollectionQuery = (body: CollectionQueryBody) => {
    const { data, error, isLoading } = useSWR(
        `/collections/page/${body.pageNum}`,
        () => collectionsFethcer(body)
    );

    return {
        collection: data,
        error,
        isLoading
    };
};
