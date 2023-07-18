import { Container, PageWrapper, } from '@/components/Layout';
import { Gift, Input, Button, UnstyleLink, Ruble, Tether } from '@/uikit';
import { TERMS_URL } from '@/config';

import styles from './DepositView.module.scss';



export function DepositView() {
    return (
        <PageWrapper>
            <Container
                className={styles.container}
                space
            >
                <div className={styles.wrap}>
                    <div className={styles.title}>
                        Buy USDT
                    </div>

                    <div className={styles.form}>
                        <div className={styles.fields}>
                            <Input
                                placeholder="Enter amount in RUB"
                                leftAddon={<Ruble />}
                                style={{ paddingLeft: '48px' }}
                            />

                            <Input
                                placeholder="Enter amount in USDT"
                                leftAddon={<Tether />}
                                style={{ paddingLeft: '48px' }}
                            />

                            <div className={styles.maticBonus}>
                                <div className={styles.maticBonusIcon}>
                                    <Gift />
                                </div>

                                <div className={styles.maticBonusText}>You will also receive <span>16 MATIC</span> to pay for gas</div>
                            </div>
                        </div>

                        <div className={styles.bottom}>
                            <div className={styles.offer}>You get <span>1 USDT</span> for <span>90 RUB</span></div>

                            <div className={styles.button}>
                                <Button>Continue</Button>

                                <div className={styles.terms}>
                                    By proceeding you agree with our <UnstyleLink
                                        href={TERMS_URL}
                                        rel='noreferrer noopener'
                                        target='_blank'
                                    >Terms</UnstyleLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </PageWrapper >
    );
}