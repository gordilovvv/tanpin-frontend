import { ReactNode } from 'react';
import { BUY_USDT_AVAILABLE, POLICY_URL, TERMS_URL, WHITEPAPER_URL } from '@/config';
import { Trans } from '@/localization';
import { Activity, Assets } from '@/uikit';
import { NavLink, NavLinkProps } from 'react-router-dom';

export type NavLink = {
    text: ReactNode | string,
    to: string,
    rel?: NavLinkProps['rel'],
    target?: NavLinkProps['target']
    /** Only for header! */
    gradient?: boolean
}

export const headerLinks: NavLink[] = [
    // { to: '/games', text: 'Games' },
    { to: '/collections', text: <Trans>Collections</Trans> },
    { to: '/nft', text: <Trans>NFT</Trans> },
];

export const headerAdditionalLinks: NavLink[] = [
    // { to: FAQ_URL, text: 'FAQ', rel: 'noreferrer noopener', target: '_blank' },
];

if (BUY_USDT_AVAILABLE) {
    headerAdditionalLinks.push({ to: '/deposit', text: <Trans values={{ currency: 'TANPIN' }}>Buy %currency%</Trans>, gradient: true });
}

export const footerLinks: NavLink[] = [
    { to: WHITEPAPER_URL, text: <Trans>Whitepaper</Trans>, target: '_blank' },
    { to: POLICY_URL, text: <Trans>Privacy Policy</Trans>, target: '_blank' },
    { to: TERMS_URL, text: <Trans>Terms</Trans>, target: '_blank' }
];

export const walletMenuLinks: (NavLink & { icon: (...args: any) => JSX.Element })[] = [
    { to: '/assets/owned', text: <Trans>My Assets</Trans>, icon: Assets },
    { to: '/activity', text: <Trans>Activity</Trans>, icon: Activity }
];