import { Owner } from '@/components/User';
import { Address } from 'viem';
import { useAccount } from '@/states/user/hooks/useAccount';
import { isAddressOwner } from '@/utils/addressHelper';

type ActivityMintProps = {
    transactionOwner: Address
}

export function ActivityMint({ transactionOwner }: ActivityMintProps) {
    const { address } = useAccount();

    return (<>
        Minted by <Owner
            address={transactionOwner}
            size='xs'
            isUser={address && isAddressOwner(address, transactionOwner)}
        />
    </>);
}