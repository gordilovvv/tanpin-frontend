import { SearchItem, SearchItemPlaceholder } from '../Item/SearchItem';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import { searchGames } from '@/states/game/fetch/searchGames';

type GamesListProps = {
    searchQuery: string,
    onError: (message: string) => void
}

export function GamesList({ searchQuery, onError }: GamesListProps) {
    const { items, isLoading } = useGlobalSearch<{
        ID: string
        name: string
        logoURL: string
    }>(
        searchQuery,
        searchGames,
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
            {items.map(game => <SearchItem
                key={game.ID}
                href={`/games/${game.ID}`}
                name={game.name}
                image={game.logoURL}
            />)}
        </>
    );
}