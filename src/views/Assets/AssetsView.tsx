import { ToggleButton, ToggleGroup } from '@/uikit';
import { Container, PageWrapper } from '@/components/Layout';
import { UserAbout } from './components/UserAbout/UserAbout';
import { Outlet } from 'react-router-dom';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useTranslation } from '@/localization';
import styles from './AssetsView.module.scss';

export function AssetsView() {
    const { t } = useTranslation();
    const { address } = useAccount();

    return (
        <PageWrapper>
            <Container>
                <div className={styles.header}>
                    <UserAbout address={address!} />

                    <ToggleGroup>
                        <ToggleButton
                            as='NavLink'
                            to="/assets/owned"
                        >
                            {t('Owned')}
                        </ToggleButton>

                        <ToggleButton
                            as='NavLink'
                            to="/assets/sale"
                        >
                            {t('On sale')}
                        </ToggleButton>
                    </ToggleGroup>
                </div>
            </Container>

            <Outlet />
        </PageWrapper>
    );
}
