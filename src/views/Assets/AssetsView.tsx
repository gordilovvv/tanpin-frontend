import { Container, PageWrapper } from '@/components/Layout';
import styles from './AssetsView.module.scss';
import { UserHead } from './components/UserHead/UserHead';
import { ToggleButton, ToggleGroup } from '@/uikit';



export function AssetsView() {
    return (
        <PageWrapper>
            <Container>
                <div className={styles.header}>
                    <UserHead
                        address='0x331F298e2Dfb55777f8692959cE0a5379Fe0C81F'
                        nftCount={3}
                        collectionsCount={2}
                    />

                    <ToggleGroup>
                        <ToggleButton
                            active
                            onClick={() => null}
                        >Owned</ToggleButton>

                        <ToggleButton onClick={() => null}>On sale</ToggleButton>
                        <ToggleButton onClick={() => null}>Collections</ToggleButton>
                    </ToggleGroup>
                </div>
            </Container>
        </PageWrapper>
    );
}