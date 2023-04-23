import { NavLinkProps } from 'react-router-dom';

type NavLink = {
    text: string,
    to: string,
    target?: NavLinkProps['target']
}

export const headerLinks: NavLink[] = [
    { to: '/games', text: 'Games' },
    { to: '/collections', text: 'Collections' },
    { to: '/nft', text: 'NFT' },
];

export const footerLinks: NavLink[] = [
    { to: '/about', text: 'About' },
    { to: 'https://docs.tanpin.org/whitepaper', text: 'Whitepaper', target: '_blank' },
    { to: 'https://blog.tanpin.org', text: 'Blog', target: '_blank' }
];