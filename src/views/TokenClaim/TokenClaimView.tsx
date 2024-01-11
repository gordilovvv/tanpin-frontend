import { Container, PageWrapper } from '@/components/Layout';
import { ClaimForm } from './components/ClaimForm';
import styles from './TokenClaimView.module.scss';

export function TokenClaimView() {
    return (
        <PageWrapper hasPaddingTop={false}>
            <Container
                maxWidth={714}
                className={styles.container}
            >
                <div
                    className={styles.background}
                    style={{
                        ['--gradient-1' as string]: '#3CE361',
                        ['--gradient-2' as string]: '#1C379A',
                        ['--gradient-3' as string]: 'rgba(255, 0, 122, 0.50)',
                    }}
                >
                    <div className={styles.gradientFirst}></div>
                    <div className={styles.gradientSecond}></div>
                    <div className={styles.gradientThird}></div>
                </div>

                <ClaimForm />
            </Container>
        </PageWrapper>
    );
}