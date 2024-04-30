import { ToggleButton, ToggleGroup } from '@/uikit';
import { SearchList } from './SearchList';
import { useTranslation } from '@/localization';
import { SearchCategory } from '@/states/search/fetch/fetchSearchResults';
import styles from './SearchResults.module.scss';

type SearchResultsProps = {
    searchQuery: string
    searchCategory: SearchCategory
    onSearchCategory: (category: SearchCategory) => void
    onSearchReset: () => void
}

export function SearchResults({ searchQuery, searchCategory, onSearchCategory, onSearchReset }: SearchResultsProps) {
    const { t } = useTranslation();

    return (
        <div className={styles.wrap}>
            <ToggleGroup>
                <ToggleButton
                    active={searchCategory === SearchCategory.NFTS}
                    onClick={() => onSearchCategory(SearchCategory.NFTS)}
                >
                    {t('NFT')}
                </ToggleButton>

                <ToggleButton
                    active={searchCategory === SearchCategory.COLLECTIONS}
                    onClick={() => onSearchCategory(SearchCategory.COLLECTIONS)}
                >
                    {t('Collections')}
                </ToggleButton>
            </ToggleGroup>

            <SearchList
                query={searchQuery}
                category={searchCategory}
                onClickItem={onSearchReset}
            />
        </div>
    );
}