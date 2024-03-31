import { Title } from '@/uikit';
import { CollectionsGrid } from '@/components/Collections';
import { useTranslation } from '@/localization';
import styles from './PopularCollections.module.scss';

export function PopularCollections() {
    const { t } = useTranslation();

    return (
        <div className={styles.wrapper}>
            <Title className={styles.title}>
                {t('Trending Collections')}
            </Title>

            <CollectionsGrid />
        </div>
    );
}
