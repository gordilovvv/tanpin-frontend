import { OwnerRow } from './Owner/OwnerRow';
import { useOwners } from '@/states/nft/hooks/useOwners';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useNFTStore } from '@/states/nft/store';
import { isAddressOwner } from '@/utils/addressHelper';
import styles from './TokenOwners.module.scss';

export function TokenOwners() {
    const owners = useOwners();
    const { address } = useAccount();
    const [contractAddress, tokenID] = useNFTStore(state => [
        state.nft!.contractAddress,
        state.nft!.tokenID
    ]);

    return (
        <div className={styles.list}>
            {owners.map(owner => <OwnerRow
                key={`${owner.owner}#${owner.status}#${owner.sale?.saleID}#${owner.auction?.ID}`}
                contractAddress={contractAddress}
                tokenID={tokenID}
                owner={owner}
                isUserOwner={isAddressOwner(address, owner.owner)}
            />)}
        </div>
    );
}