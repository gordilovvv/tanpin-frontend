import { useEffect, useRef } from 'react';
import { BackgroundGradient, Container, PageWrapper, } from '@/components/Layout';
import { BuyForm } from './components/Form/BuyForm';
import { RewardList } from './components/Referral/Reward/RewardList';
import { ReferralLink } from './components/Referral/ReferralLink';
import { FriendsTable } from './components/Referral/Table/FriendsTable';
import { LockedPlaceholder } from './components/Locked/LockedPlaceholder';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@/localization';
import { useExchangeConfig } from '@/states/deposit/hooks/useExchangeConfig';
import { useReferralInfo } from '@/states/deposit/hooks/useReferralInfo';
import { PAYMENT_FORM_AVAILABLE } from '@/config';
import tanpinCoin from '@/app/assets/images/tanpin-coin-large.png';
import classNames from 'classnames';
import styles from './DepositView.module.scss';

export function DepositView() {
    const { t } = useTranslation();
    const location = useLocation();
    const { isConnected } = useAccount();
    const isFormLocked = !PAYMENT_FORM_AVAILABLE;

    const {
        inputCurrencies,
        outputCurrencies,
        maticDistribution,
        affiliateReward,
        isLoading: isLoadingExchange,
        error
    } = useExchangeConfig();

    const { referral, isLoading: isLoadingReferral } = useReferralInfo();
    const referralEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hash = location.hash;

        if (hash) {
            setTimeout(() => {
                referralEl.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [location]);

    return (
        <PageWrapper hasPaddingTop={false}>
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

                            <div
                                className={classNames(styles.form, {
                                    [styles.blur]: isFormLocked
                                })}
                            >
                                <BuyForm
                                    inputCurrencies={inputCurrencies}
                                    outputCurrencies={outputCurrencies}
                                    maticDistribution={maticDistribution}
                                    configLoadFailed={!!error}
                                />
                            </div>

                            {isFormLocked && <LockedPlaceholder />}
                        </div>
                    </div>

                    <div
                        id='friends'
                        ref={referralEl}
                        className={styles.referral}
                    >
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