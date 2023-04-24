import { Discord, SvgProps, Telegram, Twitter } from '@/uikit';

type Social = {
    url: string,
    name: string,
    icon: (props: SvgProps) => JSX.Element
}

export const socials: Record<string, Social> = {
    twitter: {
        url: 'https://twitter.com',
        name: 'Twitter',
        icon: Twitter
    },
    telegram: {
        url: 'https://telegram.org',
        name: 'Telegram',
        icon: Telegram
    },
    discord: {
        url: 'https://discord.com/',
        name: 'Discord',
        icon: Discord
    }
};

export const socialsList = Object.values(socials);