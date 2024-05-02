import { Image, ImageSkeleton, Logo } from '@/uikit';
import { Clip } from './Clip';
import { useTranslation } from '@/localization';
import styles from './AuthHead.module.scss';

type AuthHeadProps = {
    gameName: string,
    gameLogo: string,
    walletLinked: boolean
}

export function AuthHead({ gameName, gameLogo, walletLinked }: AuthHeadProps) {
    const { t } = useTranslation();
    return (
        <div className={styles.wrap}>
            <div className={styles.game}>
                <Logo className={styles.tanpinLogo} />
                <Clip className={styles.clip} />

                <Image
                    src={gameLogo}
                    alt={gameName}
                    pending={<ImageSkeleton className={styles.gameLogoSkeleton} />}
                    className={styles.gameLogo}
                />
            </div>

            <div className={styles.content}>
                <div className={styles.title}>
                    {walletLinked ? t('Wallet successfully linked!') : t('Link Tanpin and %game%', { game: gameName })}
                </div>

                <div className={styles.description}>
                    {walletLinked ? t('You can return to the %game%.', { game: gameName }) : t('Your NFTs from the wallet will appear in the game.')}
                </div>
            </div>
        </div>
    );
}