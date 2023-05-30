import { UnstyleLink } from '@/uikit';
import { ellipseAddress } from '@/utils/addressHelper';
import { getAddressExplorerURL } from '@/utils/explorer';

type AccountProps = {
    address: string
}

export function Account({ address }: AccountProps) {
    return (
        <UnstyleLink
            href={getAddressExplorerURL(address)}
            rel='noreferrer noopener'
            target='_blank'
            style={{ color: 'var(--color-typo-base)', fontWeight: '600' }}
        >
            {ellipseAddress(address)}
        </UnstyleLink>
    );
}