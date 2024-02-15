import { BackgroundGradient, Container, PageWrapper } from '@/components/Layout';
import { ClaimForm } from './components/ClaimForm';
import styles from './TokenClaimView.module.scss';

export function TokenClaimView() {
    return (
        <PageWrapper hasPaddingTop={false}>
            <Container
                maxWidth={714}
                className={styles.container}
            >
                <BackgroundGradient />

                <ClaimForm />
            </Container>
        </PageWrapper>
    );
}