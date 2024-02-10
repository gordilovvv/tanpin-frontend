import { ConnectWalletButton } from '@/components/Menus';
import { ClaimAction } from './Action/ClaimAction';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useTranslation } from '@/localization';
import claimImg from '@/app/assets/images/claim.png';
import linesBg from '@/app/assets/images/lines-bg.svg';
import styles from './ClaimForm.module.scss';

export function ClaimForm() {
    const { t } = useTranslation();
    const { address } = useAccount();

    return (
        <div
            className={styles.box}
            style={{ backgroundImage: `url(${linesBg})` }}
        >
            <div className={styles.inner}>
                <div className={styles.top}>
                    <div className={styles.claimImage}>
                        <img
                            src={claimImg}
                            alt='Claim'
                        />
                    </div>

                    <div className={styles.title}>
                        {t('TOKEN')}<br />
                        {t('CLAIM')}
                    </div>
                </div>

                <div className={styles.bottom}>
                    {address
                        ? <ClaimAction address={address} />
                        : <div className={styles.button}>
                            <ConnectWalletButton />
                        </div>}

                    <div className={styles.note}>
                        {t('You will need to sign multiple blockchain transactions')}<br />
                        {t('if you have tokens available to claim in multiple vesting rounds.')}
                    </div>
                </div>
            </div>
        </div>
    );
}