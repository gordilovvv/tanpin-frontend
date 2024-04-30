import { Owner } from '@/components/User';
import { Address } from 'viem';
import { useTranslation } from '@/localization';
import { useAccount } from '@/states/user/hooks/useAccount';
import { isAddressOwner } from '@/utils/addressHelper';

type ActivityTransferProps = {
    recipient: Address
}

export function ActivityTransfer({ recipient }: ActivityTransferProps) {
    const { t } = useTranslation();
    const { address } = useAccount();

    return (<>
        {t('Transferred to')} <Owner
            address={recipient}
            size='xs'
            isUser={address && isAddressOwner(address, recipient)}
            onClick={event => event.stopPropagation()}
        />
    </>);
}