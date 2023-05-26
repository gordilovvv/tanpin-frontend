import { useCallback, useState } from 'react';
import { InputSearch, Select, Button, Filter as FilterIcon, Modal } from '@/uikit';
import { Container } from '@/components/Layout';
import { Filter } from '@/components/Filter';
import { NFTGrid } from './components/NFTGrid/NFTGrid';
import { CollectionHead } from './components/CollectionHead/CollectionHead';
import { NFTSort } from '@/states/nft/types';
import { useOpenedState } from '@/hooks/useOpenedState';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useFilterStore } from '@/states/collection/filterStore';
import { useFilterStoreActions } from '@/states/collection/hooks/useFilterStoreActions';
import styles from './SingleCollectionView.module.scss';
import { useParams } from 'react-router-dom';
import { useCollectionQuery } from '@/states/collection/hooks/useCollectionQuery';
import { useGameQuery } from '@/states/game/hooks/useGameQuery';

// TODO:
// 1. add search
// 2. add sort
// 3. filter
// 4. collection ID
// 5. REAL COLLECTION HEAD
export function SingleCollectionView() {
    const { gameID, collectionID } = useParams();
    if (typeof collectionID !== 'string') {
        throw new TypeError('typeof collectionID !== string');
    }
    if (typeof gameID !== 'string') {
        throw new TypeError('typeof gameID !== string');
    }
    const { sort, search } = useFilterStore(({ sort, search }) => ({
        sort,
        search
    }));
    const { setSearch, setSort } = useFilterStoreActions();

    const isPhone = useMediaQuery('(max-width: 1000px)');

    const sortOptions: { value: NFTSort; label: string }[] = [
        { value: 'RECENTLY_ADDED', label: 'Recently Added' },
        { value: 'HIGH_PRICE_FIRST', label: 'High Price First' },
        { value: 'LOW_PRICE_FIRST', label: 'Low Price First' },
    ];

    const mobileFilterState = useOpenedState();
    const [isFilterVisible, setIsFilterVisible] = useState(true);

    const handleFilterToggle = useCallback(() => {
        if (isPhone) {
            mobileFilterState.isOpen
                ? mobileFilterState.close()
                : mobileFilterState.open();
        } else {
            setIsFilterVisible(isVisible => !isVisible);
        }
    }, [mobileFilterState, setIsFilterVisible]);

    const { collection, isLoading: isCollectionLoading, error: collectionError } = useCollectionQuery(collectionID);
    const { game, isLoading: isGameLoading, error: gameError } = useGameQuery(gameID);

    return (
        <div className={styles.container}>
            <CollectionHead
                game={game ?? {
                    ID: '0',
                    name: 'NFTGTA',
                    description: 'The world\'s first blockchain-based GTA RP project. Create your own world with your favorite content creators, play and earn NFTs, exchange resources and other stuff with players and earn on selling it on Tanpin.',
                    imageURL:
                        'https://c4.wallpaperflare.com/wallpaper/514/241/320/gta-5-online-wallpaper-preview.jpg',
                    coverURL: 'https://i.seadn.io/gcs/files/6b26248d4c1d8eb42e9f9e631636164a.jpg?w=1440&auto=format',
                    logoURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pLnNlYWRuLmlvL2djcy9maWxlcy80YzY5NTc4OTBkYTgxZmMzNWY5MDYzMDUwM2YzZTQ5MC5wbmc/dz01MDAmYXV0bz1mb3JtYXQ=',
                    stats: {
                        volume: {
                            currency: 'USDT',
                            amount: '1290',
                        },
                        items: 256,
                        collections: 3,
                        floor: {
                            amount: '34234',
                            currency: 'USDT',
                        },
                    }
                }}
                collection={collection ?? {
                    ID: '1',
                    name: 'YAYO NFT',
                    description: 'YAYO NFT is a collection of 4000 YAYO Men embodying the furthest archetypes of power, speed, violence, wealth, chaos, and adventure. YAYO is a tribute to the vehicles, equipment, and aesthetics that have captured the hearts and minds of young men for generations.',
                    logoURL: 'https://assets.raribleuserdata.com/prod/v1/image/t_avatar_big/aHR0cHM6Ly9pLnNlYWRuLmlvL2djcy9maWxlcy9lMzY5ZmE1MWJhMjhkNWRhZWNkODM3Y2IwY2JmYWJmZS5wbmc/dz01MDAmYXV0bz1mb3JtYXQ=',
                    coverURL: 'https://i.seadn.io/gcs/files/6b26248d4c1d8eb42e9f9e631636164a.jpg?w=1440&auto=format',
                    symbol: 'HW',
                    stats: {
                        items: 100,
                        sales: 900,
                        volume: {
                            amount: '1000.1240214',
                            currency: 'USDT'
                        },
                        floor: {
                            amount: '10',
                            currency: 'USDT'
                        }
                    },
                    attributes: [],
                    game: {
                        ID: gameID,
                        name: 'NFTGTA',
                    }
                }}
            />

            <Container space>
                <div className={styles.wrapper}>
                    <div className={styles.top}>
                        <Button
                            iconSlot={<FilterIcon />}
                            view="secondary"
                            onClick={handleFilterToggle}
                        >
                            Filters
                        </Button>

                        <InputSearch
                            value={search}
                            placeholder="Search"
                            onChange={setSearch}
                        />

                        <Select
                            placeholderText="Sort"
                            onChange={setSort}
                            selectedValue={sort}
                            options={sortOptions}
                        />
                    </div>

                    <div className={styles.main}>
                        {
                            !isPhone
                            && isFilterVisible
                            && <div className={styles.filterWrap}>
                                <Filter />
                            </div>
                        }

                        <div className={styles.listWrap}>
                            <NFTGrid
                                gameID={gameID}
                                collectionID={collectionID}
                            />
                        </div>
                    </div>

                    {isPhone && <Modal
                        isOpen={mobileFilterState.isOpen}
                        onClose={mobileFilterState.close}
                    >
                        <Filter />
                    </Modal>}
                </div>
            </Container>
        </div>
    );
}