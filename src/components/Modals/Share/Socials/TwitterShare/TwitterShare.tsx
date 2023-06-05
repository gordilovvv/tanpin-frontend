import { Button } from '@/uikit';
import { createLink, socialShare } from '../../share';

type TwitterShareProps = {
    url: string
}

export function TwitterShare({ url }: TwitterShareProps) {
    const share = () => {
        socialShare(createLink('twitter', { url }));
    };

    return (
        <Button
            view='secondary'
            onClick={share}
        >
            Twitter
        </Button>
    );
}