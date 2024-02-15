import { BackgroundGradient, Container, PageWrapper, } from '@/components/Layout';
import { BuyForm } from './components/Form/BuyForm';
import { RewardList } from './components/Referral/Reward/RewardList';
import { ReferralLink } from './components/Referral/ReferralLink';
import { FriendsTable } from './components/Referral/Table/FriendsTable';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useTranslation } from '@/localization';
import { useExchangeConfig } from '@/states/deposit/hooks/useExchangeConfig';
import { useReferralInfo } from '@/states/deposit/hooks/useReferralInfo';
import tanpinCoin from '@/app/assets/images/tanpin-coin-large.png';
import styles from './DepositView.module.scss';

export function DepositView() {
    const { t } = useTranslation();
    const { isConnected } = useAccount();
    const { referral, isLoading: isLoadingReferral } = useReferralInfo();
    const { paymentLimits, maticDistribution, affiliateReward, isLoading: isLoadingExchange, error } = useExchangeConfig();

    return (
        <PageWrapper>
            <Container
                className={styles.container}
                maxWidth={993}
                space
            >
                <BackgroundGradient />

                <div className={styles.wrap}>
                    <div className={styles.buy}>
                        <div className={styles.buyWrap}>
                            <div className={styles.title}>
                                <div className={styles.coin}>
                                    <img
                                        src={tanpinCoin}
                                        alt=''
                                    />
                                </div>

                                <div className={styles.titleText}>
                                    {t('Get')} <span>TANPIN</span> {t('tokens')}
                                </div>
                            </div>

                            <BuyForm
                                paymentLimits={paymentLimits}
                                maticDistribution={maticDistribution}
                                configLoadFailed={!!error}
                            />
                        </div>
                    </div>

                    <div className={styles.referral}>
                        <div className={styles.referralWrap}>
                            <div className={styles.title}>
                                <div className={styles.titleText}>
                                    {t('Even')} <span>{t('more fun')}</span> {t('together!')}
                                </div>
                            </div>

                            <div className={styles.description}>
                                {t('Refer your friend and earn rewards! Both of you will get a bonus after their first token purchase.')}
                            </div>

                            <div className={styles.referralMain}>
                                {isConnected && <ReferralLink
                                    referralId={referral?.id}
                                    loading={isLoadingReferral}
                                />}

                                <RewardList
                                    rewards={affiliateReward}
                                    loading={isLoadingExchange}
                                />
                            </div>

                            {isConnected && <FriendsTable
                                friends={referral?.friends}
                                loading={isLoadingReferral}
                            />}
                        </div>
                    </div>
                </div>
            </Container>
        </PageWrapper >
    );
}