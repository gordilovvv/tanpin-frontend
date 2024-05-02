import blackRussiaLogo from '@/app/assets/images/game/blackrussia-logo.png';
import blackRussiaCover from '@/app/assets/images/game/blackrussia-cover.png';

export const games: {
    [gameID: string]: {
        ID: string,
        name: string
        logo: string,
        background: string
    }
} = {
    'black-russia': {
        ID: 'black-russia',
        name: 'Black Russia',
        logo: blackRussiaLogo,
        background: blackRussiaCover
    }
};