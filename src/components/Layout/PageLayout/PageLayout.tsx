import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/components/Menus';
import { Container } from '../Container/Container';
import styles from './PageLayout.module.scss';

export function PageLayout() {
    return (
        <>
            <Header />

            <div className={styles.paddingTop}>
                <Container>
                    <Outlet />
                </Container>
            </div>

            <Footer />
        </>
    );
}
