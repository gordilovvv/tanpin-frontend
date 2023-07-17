import { Discord, SvgProps, Telegram, Twitter } from '@/uikit';

type Social = {
    url: string,
    name: string,
    icon: (props: SvgProps) => JSX.Element
}

export const socials: Record<string, Social> = {
    twitter: {
        url: 'https://twitter.com/tanpin_io',
        name: 'Twitter',
        icon: Twitter
    },
    telegram: {
        url: 'https://t.me/tanpin_io',
        name: 'Telegram',
        icon: Telegram
    },
    discord: {
        url: 'https://ds.tanpin.io',
        name: 'Discord',
        icon: Discord
    }
};

export const socialsList = Object.values(socials);