import { WalletButton } from '../WalletButton/WalletButton';
import { getReferralCode } from '@/states/deposit/hooks/useReferralCode';
import { TELEGRAM_BOT_URL } from '@/config';
import tgLogo from '@/app/assets/images/tg.png';

export function ConnectTelegramButton() {
    const referralCode = getReferralCode();
    const currentUrl = encodeURIComponent(`${window.location.pathname}${window.location.search}`);

    let params = `u_${currentUrl}`;
    if (referralCode) {
        params += `&r_${referralCode}`;
    }

    const data = Buffer.from(params).toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    const authUrl = `${TELEGRAM_BOT_URL}?start=${data}`;

    return (
        <WalletButton
            as='link'
            href={authUrl}
            icon={<img
                src={tgLogo}
                alt='tg'
            />}
            title='Telegram'
        />
    );
}