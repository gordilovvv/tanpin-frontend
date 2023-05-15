import { SearchItem, SearchItemPlaceholder } from '../Item/SearchItem';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { searchCollections } from '@/states/collection/fetch/searchCollections';

type CollectionsListProps = {
    searchQuery: string,
    onError: (message: string) => void
}

export function CollectionsList({ searchQuery, onError }: CollectionsListProps) {
    const { items, isLoading } = useGlobalSearch<{
        ID: string
        name: string
        logoURL: string
    }>(
        searchQuery,
        searchCollections,
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
            {items.map(collection => <SearchItem
                key={collection.ID}
                href={`/collections/${collection.ID}`}
                name={collection.name}
                image={collection.logoURL}
            />)}
        </>
    );
}