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
// 1. Собрать объект фильтра и отдать его компоненту NFTGrid
// 2. При изменения фильтра записывать данные в url
// 3. { gameID, collectionID } = useParams(); сделать отдельный хук useURLStringParams чтобы убрать из компонента не нужную валидацию
export function SingleCollectionView() {
    const { gameID, collectionID } = useParams();

    // TODO: собрать фильтр ТУТ для передачи NFTGrid.tsx
    const { sort, search } = useFilterStore(({ sort, search }) => ({
        sort,
        search
    }));
    const { setSearch, setSort } = useFilterStoreActions();

    const isPhone = useMediaQuery('(max-width: 1000px)');

    const sortOptions: { value: `${NFTSort}`; label: string }[] = [
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

    // TODO: error
    if (gameError || collectionError)
        return (<div>error</div>);

    // TODO: loading
    if (isGameLoading || isCollectionLoading || !game || !collection)
        return (<div>loading</div>);

    return (
        <div className={styles.container}>
            <CollectionHead
                game={game}
                collection={collection}
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