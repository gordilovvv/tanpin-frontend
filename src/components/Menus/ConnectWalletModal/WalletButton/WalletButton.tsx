import { useState } from 'react';
import { Spin, UnstyleButton, UnstyleLink } from '@/uikit';
import { WalletConfig } from '@/config/wallet';
import { isTouchDevice } from '@/utils/isTouchDevice';
import classNames from 'classnames';
import styles from './WalletButton.module.scss';

type WalletButtonProps = {
    wallet: WalletConfig,
    onConnect: () => Promise<any>
}

export function WalletButton({ wallet, onConnect }: WalletButtonProps) {
    const { icon: Icon, title, installed, deepLink } = wallet;
    const isLink = isTouchDevice && deepLink && !installed;
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        if (installed) {
            setIsLoading(true);
            onConnect().then(() => setIsLoading(false));
        }
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
                [styles.disabled]: !installed
            })}
            onClick={handleClick}
        >
            {isLoading && <div className={styles.spin}>
                <Spin size='s' />
            </div>}

            <div className={styles.title}>
                {title}
            </div>

            <Icon />
        </UnstyleButton>
    );
}