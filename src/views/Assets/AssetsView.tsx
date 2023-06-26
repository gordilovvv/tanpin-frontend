import { Container, PageWrapper } from '@/components/Layout';
import styles from './AssetsView.module.scss';
import { UserAbout } from './components/UserAbout/UserAbout';
import { ToggleButton, ToggleGroup } from '@/uikit';
import { NavLink, Outlet } from 'react-router-dom';

export function AssetsView() {
    return (
        <PageWrapper>
            <Container>
                <div className={styles.header}>
                    <UserAbout
                        address='0x331F298e2Dfb55777f8692959cE0a5379Fe0C81F'
                        nftCount={3}
                        collectionsCount={2}
                    />

                    <ToggleGroup>
                        <NavLink to="/assets/owned">
                            {({ isActive }) =>
                                <ToggleButton active={isActive}>
                                    Owned
                                </ToggleButton>
                            }
                        </NavLink>

                        <NavLink to="/assets/sale">
                            {({ isActive }) =>
                                <ToggleButton active={isActive}>
                                    On sale
                                </ToggleButton>
                            }
                        </NavLink>

                        <NavLink to="/assets/collections">
                            {({ isActive }) =>
                                <ToggleButton active={isActive}>
                                    Collections
                                </ToggleButton>
                            }
                        </NavLink>
                    </ToggleGroup>
                </div>
            </Container>

            <Outlet />
        </PageWrapper>
    );
}
