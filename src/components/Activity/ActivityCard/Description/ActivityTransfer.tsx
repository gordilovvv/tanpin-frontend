import { Owner } from '@/components/User';
import { Address } from 'viem';
import { useAccount } from '@/states/user/hooks/useAccount';
import { isAddressOwner } from '@/utils/addressHelper';

type ActivityTransferProps = {
    recipient: Address
}

export function ActivityTransfer({ recipient }: ActivityTransferProps) {
    const { address } = useAccount();

    return (<>
        Transferred to <Owner
            address={recipient}
            size='xs'
            isUser={address && isAddressOwner(address, recipient)}
        />
    </>);
}