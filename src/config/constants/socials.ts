import { Discord, SvgProps, Telegram, Twitter } from '@/uikit';
import { VK } from '@/uikit/Icons/components/VK';

type Social = {
    url: string,
    name: string,
    icon: (props: SvgProps) => JSX.Element
}

export const socials: Record<string, Social> = {
    telegram: {
        url: 'https://t.me/+oVC2jPvjbPZlMzAy',
        name: 'Telegram',
        icon: Telegram
    },
    discord: {
        url: 'https://ds.tanpin.io',
        name: 'Discord',
        icon: Discord
    },
    twitter: {
        url: 'https://twitter.com/tanpin_en',
        name: 'Twitter',
        icon: Twitter
    },
};

export const socialsList = Object.values(socials);

export const blackRussiaSocials: Record<string, Omit<Social, 'name'>> = {
    vk: {
        url: 'https://vk.com/blackrussia.online',
        icon: VK
    },
    discord: {
        url: 'https://discord.com/invite/xPPAA4rAAd',
        icon: Discord
    },
    telegram: {
        url: 'https://t.me/br_dev',
        icon: Telegram
    }
};

export const blackRussiaSocialsList = Object.values(blackRussiaSocials);