import { useSearch } from '@/states/search/hooks/useSearch';
import { SearchItem } from '../Item/SearchItem';
import { ResultsEmpty } from '../Empty/ResultsEmpty';
import { ResultsPlaceholder } from '../Placeholder/ResultsPlaceholder';
import { searchNFT } from '@/states/search/fetch/searchNFT';

type NFTListProps = {
    searchQuery: string
}

export function NFTList({ searchQuery }: NFTListProps) {
    const { items, isLoading } = useSearch({
        searchQuery,
        fetchCallback: searchNFT
    });

    if (isLoading) {
        return (<ResultsPlaceholder />);
    }

    if (!items.length) {
        return (<ResultsEmpty />);
    }

    return (
        <>
            {items.map(nft => <SearchItem
                key={nft.ID}
                href={`/${nft.gameID}/${nft.collectionID}/${nft.ID}`}
                name={nft.name}
                image={nft.imageURL}
            />)}
        </>
    );
}