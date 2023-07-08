import { SearchItem } from '../Item/SearchItem';
import { ResultsEmpty } from '../Empty/ResultsEmpty';
import { ResultsPlaceholder } from '../Placeholder/ResultsPlaceholder';
import { useSearch } from '@/states/search/hooks/useSearch';
import { searchCollections } from '@/states/search/fetch/searchCollections';

type CollectionsListProps = {
    searchQuery: string
}

export function CollectionsList({ searchQuery }: CollectionsListProps) {
    const { items, isLoading } = useSearch({
        searchQuery,
        fetchCallback: searchCollections
    });

    if (isLoading) {
        return (<ResultsPlaceholder />);
    }

    if (!items.length) {
        return (<ResultsEmpty />);
    }

    return (
        <>
            {items.map(collection => <SearchItem
                key={collection.ID}
                href={`/${collection.gameID}/${collection.ID}`}
                name={collection.name}
                image={collection.imageURL}
            />)}
        </>
    );
}