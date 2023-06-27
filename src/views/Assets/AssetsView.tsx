import { ToggleButton, ToggleGroup } from '@/uikit';
import { Container, PageWrapper } from '@/components/Layout';
import { UserAbout } from './components/UserAbout/UserAbout';
import { Outlet } from 'react-router-dom';
import { useAccount } from '@/states/user/hooks/useAccount';
import styles from './AssetsView.module.scss';

export function AssetsView() {
    const { address } = useAccount();

    return (
        <PageWrapper>
            <Container space>
                <div className={styles.header}>
                    <UserAbout
                        address={address!}
                        nftCount={3}
                        collectionsCount={2}
                    />

                    <ToggleGroup>
                        <ToggleButton
                            as='NavLink'
                            to="/assets/owned"
                        >
                            Owned
                        </ToggleButton>

                        <ToggleButton
                            as='NavLink'
                            to="/assets/sale"
                        >
                            On sale
                        </ToggleButton>

                        <ToggleButton
                            as='NavLink'
                            to="/assets/collections"
                        >
                            Collections
                        </ToggleButton>
                    </ToggleGroup>
                </div>
            </Container>

            <Outlet />
        </PageWrapper>
    );
}
