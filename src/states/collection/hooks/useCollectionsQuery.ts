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

const collectionsFethcer = async (body: CollectionQueryBody) => {
    // TODO: fix URL
    const result = await fetch('/collections.get.list', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });
    return (await result.json());
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
