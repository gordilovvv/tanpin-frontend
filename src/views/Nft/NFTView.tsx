import { NFTExplorer } from '@/components/Explorer';
import { CatalogHead, Container, PageWrapper } from '@/components/Layout';
import styles from './NFTView.module.scss';

// TODO: rename to NFTListView
export function NFTView() {
    return (
        <PageWrapper>
            <Container space>
                <div className={styles.wrapper}>
                    <CatalogHead
                        title='NFT'
                        description='Discover NFT from your favorite games'
                    />

                    <NFTExplorer />
                </div>
            </Container>
        </PageWrapper>
    );
}