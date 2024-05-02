import { HTMLAttributes } from 'react';
import { Title, Cat, Button } from '@/uikit';
import { useTranslation } from '@/localization';
import { TELEGRAM_PARTNERSHIP_URL } from '@/config';
import promoImg from '@/app/assets/bg/promo.png';
import classNames from 'classnames';
import styles from './PromoComponent.module.scss';

export function PromoComponent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    const { t } = useTranslation();

    return (
        <div
            className={classNames(styles.promo, className)}
            style={{ backgroundImage: `url(${promoImg})` }}
            {...props}
        >
            <div className={styles.inner}>
                <div className={styles.top}>
                    <Title className={styles.title}>
                        {t('TanPin is a next generation marketplace that connects off-chain games with Web 3.0')}
                    </Title>

                    <div className={styles.text}>
                        {t('We aim to create a reliable income stream for game developers and players through the use of NFTs and game reward pools on the blockchain.')}
                    </div>
                </div>

                <div className={styles.wrapperBtn}>
                    <Button
                        as='a'
                        href={TELEGRAM_PARTNERSHIP_URL}
                        rel='noreferrer noopener'
                        target='_blank'
                    >
                        {t('Integrate game')}
                    </Button>
                </div>
            </div>

            <div className={styles.cat}>
                <Cat />
            </div>
        </div>
    );
}