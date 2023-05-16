import { SearchItem, SearchItemPlaceholder } from '../Item/SearchItem';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { searchNFT } from '@/states/nft/fetch/searchNft';

type NFTListProps = {
    searchQuery: string,
    onError: (message: string) => void
}

export function NFTList({ searchQuery, onError }: NFTListProps) {
    const { items, isLoading } = useGlobalSearch<{
        ID: string
        name: string
        logoURL: string
        collectionID: string
    }>(
        searchQuery,
        searchNFT,
        onError
    );

    if (isLoading || !items) {
        return (
            <>
                <SearchItemPlaceholder index={0} />
                <SearchItemPlaceholder index={1} />
                <SearchItemPlaceholder index={2} />
                <SearchItemPlaceholder index={3} />
            </>
        );
    }

    return (
        <>
            {items.map(nft => <SearchItem
                key={nft.ID}
                href={`/collections/${nft.collectionID}/${nft.ID}`}
                name={nft.name}
                image={nft.logoURL}
            />)}
        </>
    );
}