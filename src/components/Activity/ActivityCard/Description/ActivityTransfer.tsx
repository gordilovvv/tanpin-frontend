import { Owner } from '@/components/User';
import { Address } from 'viem';
import { useAccount } from '@/states/user/hooks/useAccount';
import { isAddressOwner } from '@/utils/addressHelper';

type ActivityTransferProps = {
    transactionOwner: Address
}

export function ActivityTransfer({ transactionOwner }: ActivityTransferProps) {
    const { address } = useAccount();

    return (<>
        Transferred to <Owner
            address={transactionOwner}
            size='xs'
            isUser={address && isAddressOwner(address, transactionOwner)}
        />
    </>);
}