import { Container } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { MenuLink } from './Link/MenuLink';
import { MobileMenu } from './Mobile/Menu/MobileMenu';
import { MobileButton } from './MobileButton/MobileButton';
import { Burger } from './MobileButton/Svg/Burger';
import { Close } from './MobileButton/Svg/Close';
import { Search } from './MobileButton/Svg/Search';
import { MobileWallet } from './Mobile/Wallet/MobileWallet';
import { MobileSearch } from './Mobile/Search/MobileSearch';
import { MobileDrawer } from './Mobile/MobileDrawer';
import { HeaderWallet } from './Wallet/HeaderWallet';
import { HeaderSearch } from './Search/HeaderSearch';
import { NotificationsButton } from './NotificationsButton/NotificationsButton';
import { MobileWalletButton } from '../WalletButton/MobileWalletButton';
import { LanguageButton } from './Language/LanguageButton';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useOpenedState } from '@/hooks/useOpenedState';
import { headerAdditionalLinks, headerLinks } from '../config';
import styles from './Header.module.scss';

export function Header() {
    const { isConnected, address } = useAccount();
    const mobileMenuState = useOpenedState();
    const mobileSearchState = useOpenedState();
    const mobileWalletState = useOpenedState();

    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.stack}>
                        <Link
                            to='/'
                            className={styles.logo}
                        >
                            <Logo />
                        </Link>

                        <MobileButton
                            active={mobileSearchState.isOpen}
                            defaultIcon={<Search />}
                            activeIcon={<Close />}
                            className={styles.mobileButton}
                            onClick={mobileSearchState.toggle}
                        />

                        <HeaderSearch />

                        <div className={styles.menu}>
                            {headerLinks.map(link => <MenuLink
                                key={link.to}
                                {...link}
                            />)}
                        </div>
                    </div>

                    <div className={styles.stack}>
                        <div className={styles.menu}>
                            {headerAdditionalLinks.map(link => <MenuLink
                                key={link.to}
                                {...link}
                            />)}
                        </div>

                        {isConnected && <NotificationsButton className={styles.desktopNotification} />}

                        <LanguageButton className={styles.desktopLanguage} />

                        <HeaderWallet
                            address={address}
                            isConnected={isConnected}
                        />

                        <MobileWalletButton
                            active={mobileWalletState.isOpen}
                            isConnected={isConnected}
                            onOpenWallet={mobileWalletState.toggle}
                            className={styles.mobileButton}
                        />

                        <MobileButton
                            active={mobileMenuState.isOpen}
                            defaultIcon={<Burger />}
                            activeIcon={<Close />}
                            className={styles.mobileButton}
                            onClick={mobileMenuState.toggle}
                        />
                    </div>
                </div>

                <MobileDrawer
                    isOpen={mobileSearchState.isOpen}
                    close={mobileSearchState.close}
                >
                    <MobileSearch />
                </MobileDrawer>

                <MobileDrawer
                    isOpen={mobileMenuState.isOpen}
                    close={mobileMenuState.close}
                >
                    <MobileMenu />
                </MobileDrawer>

                {address && <MobileDrawer
                    isOpen={mobileWalletState.isOpen}
                    close={mobileWalletState.close}
                >
                    <MobileWallet address={address} />
                </MobileDrawer>}
            </Container>
        </div>
    );
}
