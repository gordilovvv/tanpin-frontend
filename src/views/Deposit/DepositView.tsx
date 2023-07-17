import { Container, PageWrapper, } from '@/components/Layout';
import { Gas, Input, Title, Button, UnstyleLink } from '@/uikit';
import { TERMS_URL } from '@/config';

import styles from './DepositView.module.scss';



export function DepositView() {
    return (
        <PageWrapper style={{ justifyContent: 'center' }}>
            <Container
                maxWidth={390}
                className={styles.wrapp}
            >
                <Title className={styles.title}>
                    Buy USDT
                </Title>

                <div className={styles.main}>
                    <div className={styles.inputWrapp}>
                        <Input placeholder="Enter amount in RUB" />
                        <Input placeholder="Enter amount in RUB" />
                    </div>

                    <div className={styles.gas}>
                        <Gas className={styles.gasIcon} /> <div>You will also receive <span>16 MATIC</span> to pay for gas</div>
                    </div>
                </div>

                <div className={styles.down}>
                    <div className={styles.offer}>You get <span>1 USDT</span> for <span>90 RUB</span></div>

                    <div className={styles.buttonWrap}>
                        <Button>Continue</Button>

                        <div className={styles.terms}>
                            By proceeding you agree with our <UnstyleLink
                                href={TERMS_URL}
                                rel='noreferrer noopener'
                                target='_blank'
                                className={styles.termsLink}
                            >Terms</UnstyleLink>
                        </div>
                    </div>
                </div>
            </Container>
        </PageWrapper >
    );
}