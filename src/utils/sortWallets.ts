import { WalletConfig } from '@/config/wallet';

export function sortWallets(wallets: WalletConfig[]) {
    return [...wallets].sort((a, b) => {
        if (a.recommended === b.recommended && a.installed === b.installed) {
            return 0;
        } else if (a.recommended === true && a.deepLink) {
            return -1;
        } else if (b.recommended === true && b.deepLink) {
            return 1;
        } else if (a.installed === b.installed) {
            return 0;
        } else if (a.installed === true) {
            return -1;
        } else if (a.installed === undefined) {
            return b.installed === true ? 1 : -1;
        } else {
            return 1;
        }
    });
}