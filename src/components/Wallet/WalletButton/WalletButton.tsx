import { useState } from 'react';
import { Spin, UnstyleButton, UnstyleLink } from '@/uikit';
import { WalletConfig } from '@/config/wallet';
import classNames from 'classnames';
import styles from './WalletButton.module.scss';

type WalletButtonProps = {
    wallet: WalletConfig,
    onConnect: () => Promise<any>
}

export function WalletButton({ wallet, onConnect }: WalletButtonProps) {
    const { icon: Icon, title, installed, recommended, deepLink } = wallet;
    const [isLoading, setIsLoading] = useState(false);
    const isLink = deepLink && installed === false;

    const handleClick = () => {
        if (installed === false) {
            return;
        }

        setIsLoading(true);
        onConnect().then(() => setIsLoading(false));
    };

    if (isLink) {
        return <UnstyleLink
            href={deepLink}
            rel='noreferrer noopener'
            target='_blank'
            className={classNames(styles.button)}
        >
            <div className={styles.title}>
                {title}
            </div>

            <Icon />
        </UnstyleLink>;
    }

    return (
        <UnstyleButton
            className={classNames(styles.button, {
                [styles.loading]: isLoading,
                [styles.disabled]: installed === false
            })}
            onClick={handleClick}
        >
            {isLoading && <div className={styles.spin}>
                <Spin size='s' />
            </div>}

            <div className={styles.content}>
                <div className={styles.title}>
                    {title}
                </div>

                {recommended && <div className={styles.label}>
                    Recommended
                </div>}
            </div>

            <Icon />
        </UnstyleButton>
    );
}