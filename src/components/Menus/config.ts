import { POLICY_URL, TERMS_URL } from '@/config';
import { Activity, Assets } from '@/uikit';
import { NavLink, NavLinkProps } from 'react-router-dom';

type NavLink = {
    text: string,
    to: string,
    target?: NavLinkProps['target']
}

export const headerLinks: NavLink[] = [
    // { to: '/games', text: 'Games' },
    { to: '/collections', text: 'Collections' },
    { to: '/nft', text: 'NFT' },
];

export const footerLinks: NavLink[] = [
    { to: POLICY_URL, text: 'Privacy policy', target: '_blank' },
    { to: TERMS_URL, text: 'Terms', target: '_blank' }
];

export const walletMenuLinks: (NavLink & { icon: (...args: any) => JSX.Element })[] = [
    { to: '/assets/owned', text: 'My Assets', icon: Assets },
    { to: '/activity', text: 'Activity', icon: Activity }
];