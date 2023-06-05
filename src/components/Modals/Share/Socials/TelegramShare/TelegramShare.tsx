import { createLink, socialShare } from '../../share';
import { Button } from '@/uikit';

type TelegramShareProps = {
    url: string
}

export function TelegramShare({ url }: TelegramShareProps) {
    const share = () => {
        socialShare(createLink('telegram', { url }));
    };

    return (
        <Button
            view='secondary'
            onClick={share}
        >
            Telegram
        </Button>
    );
}