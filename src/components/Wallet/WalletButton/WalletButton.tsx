import { ReactNode } from 'react';
import { Spin, UnstyleButton, UnstyleLink } from '@/uikit';
import { useTranslation } from '@/localization';
import classNames from 'classnames';
import styles from './WalletButton.module.scss';

type LinkProps = {
    href?: string,
    target?: '_blank'
}

type ButtonProps = {
    loading?: boolean,
    disabled?: boolean,
    onClick?: () => void
}

type WalletButtonProps<T extends 'link' | 'button'> = {
    as?: T,
    title: string,
    icon: ReactNode,
    recommended?: boolean
} & (T extends 'link' ? LinkProps : ButtonProps);

export function WalletButton<Tag extends 'link' | 'button'>(props: WalletButtonProps<Tag>) {
    const { as: tag, title, icon, recommended, ...rest } = props;
    const { t } = useTranslation();

    if (tag === 'link') {
        const { href, target } = rest as LinkProps;

        return <UnstyleLink
            href={href}
            rel='noreferrer noopener'
            target={target}
            className={classNames(styles.button)}
        >
            <div className={styles.content}>
                <div className={styles.title}>
                    {title}
                </div>

                {recommended && <div className={styles.label}>
                    {t('Recommended')}
                </div>}
            </div>

            <div className={styles.icon}>
                {icon}
            </div>
        </UnstyleLink>;
    }

    const { loading, disabled, onClick } = rest as ButtonProps;

    return (
        <UnstyleButton
            className={classNames(styles.button, {
                [styles.loading]: loading,
                [styles.disabled]: disabled
            })}
            onClick={onClick}
        >
            {loading && <div className={styles.spin}>
                <Spin size='s' />
            </div>}

            <div className={styles.content}>
                <div className={styles.title}>
                    {title}
                </div>

                {recommended && <div className={styles.label}>
                    {t('Recommended')}
                </div>}
            </div>

            <div className={styles.icon}>
                {icon}
            </div>
        </UnstyleButton>
    );
}