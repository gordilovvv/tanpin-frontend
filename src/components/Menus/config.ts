import { BUY_USDT_AVAILABLE, POLICY_URL, TERMS_URL, WHITEPAPER_URL } from '@/config';
import { Activity, Assets } from '@/uikit';
import { NavLink, NavLinkProps } from 'react-router-dom';

export type NavLink = {
    text: string,
    to: string,
    rel?: NavLinkProps['rel'],
    target?: NavLinkProps['target']
    /** Only for header! */
    gradient?: boolean
}

export const headerLinks: NavLink[] = [
    // { to: '/games', text: 'Games' },
    { to: '/collections', text: 'Collections' },
    { to: '/nft', text: 'NFT' },
];

export const headerAdditionalLinks: NavLink[] = [
    // { to: FAQ_URL, text: 'FAQ', rel: 'noreferrer noopener', target: '_blank' },
];

if (BUY_USDT_AVAILABLE) {
    headerAdditionalLinks.push({ to: '/deposit', text: 'Buy USDT', gradient: true });
}

export const footerLinks: NavLink[] = [
    { to: WHITEPAPER_URL, text: 'Whitepaper', target: '_blank' },
    { to: POLICY_URL, text: 'Privacy policy', target: '_blank' },
    { to: TERMS_URL, text: 'Terms', target: '_blank' }
];

export const walletMenuLinks: (NavLink & { icon: (...args: any) => JSX.Element })[] = [
    { to: '/assets/owned', text: 'My Assets', icon: Assets },
    { to: '/activity', text: 'Activity', icon: Activity }
];