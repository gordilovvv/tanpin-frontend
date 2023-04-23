import { Container } from '@/components/Layout';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/uikit';
import { Logo } from './Logo';
import { Burger } from './Burger/Burger';
import { MobileDrawer } from './Mobile/MobileDrawer';
import { useOpenedState } from '@/hooks/useOpenedState';
import { headerLinks } from '../config';
import classNames from 'classnames';
import styles from './Header.module.scss';

export function Header() {
    const mobileDrawerState = useOpenedState();

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
                        <Button className={styles.wallet}>
                            Connect wallet
                        </Button>

                        <div className={styles.mobileStack}>
                            <Burger
                                active={mobileDrawerState.isOpen}
                                className={styles.mobileButton}
                                onClick={mobileDrawerState.toggle}
                            />
                        </div>
                    </div>
                </div>

                <MobileDrawer
                    isOpen={mobileDrawerState.isOpen}
                    close={mobileDrawerState.close}
                />
            </Container>
        </div>
    );
}