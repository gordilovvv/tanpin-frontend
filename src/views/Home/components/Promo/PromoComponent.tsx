import { HTMLAttributes } from 'react';
import { Title, Cat } from '@/uikit';
import classNames from 'classnames';
import styles from './PromoComponent.module.scss';
import promoImg from '@/app/assets/bg/promo.png';

export function PromoComponent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={classNames(styles.promo, className)}
            style={{ backgroundImage: `url(${promoImg})` }}
            {...props}
        >
            <div className={styles.inner}>
                <div className={styles.top}>
                    <Title className={styles.title}>
                        TanPin is a next generation marketplace that connects off-chain games with Web 3.0
                    </Title>

                    <div className={styles.text}>
                        We aim to create a reliable income stream for game developers and players through the use of NFTs and game reward pools on the blockchain.
                    </div>
                </div>

                {/* <div className={styles.wrapperBtn}>
                    <Button>
                        Become a partner
                    </Button>

                    <Button view='secondary'>
                        Learn more
                    </Button>
                </div> */}
            </div>

            <div className={styles.cat}>
                <Cat />
            </div>
        </div>
    );
}