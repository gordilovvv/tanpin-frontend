import { ReactNode } from 'react';
import { UnstyleButton } from '@/uikit';
import { Link } from 'react-router-dom';
import styles from './MenuLink.module.scss';

type MenuLinkProps = {
    to?: string,
    text: ReactNode | string,
    iconSlot: ReactNode,
    onClick?: () => void
}

export function MenuLink({ to, text, iconSlot, onClick }: MenuLinkProps) {
    const content = (
        <>
            <span className={styles.icon}>
                {iconSlot}
            </span>

            <span className={styles.text}>
                {text}
            </span>
        </>
    );

    if (to) {
        return <Link
            to={to}
            className={styles.link}
        >
            {content}
        </Link>;
    }

    return (
        <UnstyleButton
            className={styles.link}
            onClick={onClick}
        >
            {content}
        </UnstyleButton>
    );
}