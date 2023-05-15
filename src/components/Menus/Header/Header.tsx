import { Container } from '@/components/Layout';
import { Link, NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { MobileMenu } from './Mobile/Menu/MobileMenu';
import { MobileButton } from './MobileButton/MobileButton';
import { Burger } from './MobileButton/Svg/Burger';
import { Close } from './MobileButton/Svg/Close';
import { Search } from './MobileButton/Svg/Search';
import { MobileSearch } from './Mobile/Search/MobileSearch';
import { MobileDrawer } from './Mobile/MobileDrawer';
import { HeaderWallet } from './Wallet/HeaderWallet';
import { HeaderSearch } from './Search/HeaderSearch';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useOpenedState } from '@/hooks/useOpenedState';
import { headerLinks } from '../config';
import classNames from 'classnames';
import styles from './Header.module.scss';

export function Header() {
    const { isConnected, address } = useAccount();
    const mobileMenuState = useOpenedState();
    const mobileSearchState = useOpenedState();

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

                        <HeaderSearch />

                        <div className={styles.menu}>
                            {headerLinks.map(link => <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => classNames(styles.menuLink, {
                                    [styles.active]: isActive
                                })}
                            >
                                {link.text}
                            </NavLink>)}
                        </div>
                    </div>

                    <div className={styles.stack}>
                        <HeaderWallet
                            address={address}
                            isConnected={isConnected}
                        />

                        <div className={styles.mobileStack}>
                            <MobileButton
                                active={mobileSearchState.isOpen}
                                defaultIcon={<Search />}
                                activeIcon={<Close />}
                                className={styles.mobileButton}
                                onClick={mobileSearchState.toggle}
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
                    <MobileMenu
                        address={address}
                        isConnected={isConnected}
                    />
                </MobileDrawer>
            </Container>
        </div>
    );
}
