import { Spin } from '@/uikit';
import { SearchItem } from './SearchItem';
import { useTranslation } from '@/localization';
import { useSearch } from '@/states/search/hooks/useSearch';
import { SearchCategory, SearchedCollection, SearchedNFT } from '@/states/search/fetch/fetchSearchResults';
import styles from './SearchList.module.scss';

type SearchListProps = {
    query: string,
    category: SearchCategory
    onClickItem: () => void
}

export function SearchList({ query, category, onClickItem }: SearchListProps) {
    const { t } = useTranslation();
    const { data, error, isLoading } = useSearch({
        category,
        query
    });

    if (isLoading) {
        return (
            <div className={styles.placeholder}>
                <Spin size='s' />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error}>
                {error}
            </div>
        );
    }

    if (!data?.length) {
        return (
            <div className={styles.empty}>
                {t('Nothing found')}
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {data.map(item => {
                if (category === SearchCategory.NFTS) {
                    const nft = item as SearchedNFT;

                    return (
                        <SearchItem
                            key={`${item.address}:${nft.tokenID}`}
                            href={`/${nft.address}/${nft.tokenID}`}
                            name={nft.name}
                            image={nft.imageURL}
                            onClick={onClickItem}
                        />
                    );
                } else {
                    const collection = item as SearchedCollection;

                    return (
                        <SearchItem
                            key={collection.id}
                            href={`/collection/${collection.id}`}
                            name={collection.name}
                            image={collection.imageURL}
                            onClick={onClickItem}
                        />
                    );
                }
            })}
        </div>
    );
}