import { createLink, socialShare } from '../../share';
import { Button } from '@/uikit';

type VkShareProps = {
    url: string
}

export function VkShare({ url }: VkShareProps) {
    const share = () => {
        socialShare(createLink('vk', { url }));
    };
    return (
        <Button
            view='secondary'
            onClick={share}
        >
            VK
        </Button>
    );
}