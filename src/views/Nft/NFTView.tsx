import { NFTExplorer } from '@/components/Explorer';
import { CatalogHead, Container, PageWrapper } from '@/components/Layout';
import { useTranslation } from '@/localization';
import styles from './NFTView.module.scss';

// TODO: rename to NFTListView
export function NFTView() {
    const { t } = useTranslation();

    return (
        <PageWrapper>
            <Container space>
                <div className={styles.wrapper}>
                    <CatalogHead
                        title={t('NFT')}
                        description={t('Discover NFT from your favorite games')}
                    />

                    <NFTExplorer type='items' />
                </div>
            </Container>
        </PageWrapper>
    );
}