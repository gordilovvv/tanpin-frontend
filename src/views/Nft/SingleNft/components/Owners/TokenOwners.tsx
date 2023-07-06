import { OwnerRow } from './Owner/OwnerRow';
import { useOwners } from '@/states/nft/hooks/useOwners';
import { useAccount } from '@/states/user/hooks/useAccount';
import { useNFTStore } from '@/states/nft/store';
import { isAddressOwner } from '@/utils/addressHelper';
import styles from './TokenOwners.module.scss';

export function TokenOwners() {
    const nftID = useNFTStore(state => state.nft!.ID);
    const owners = useOwners();
    const { address } = useAccount();

    return (
        <div className={styles.list}>
            {owners.map(owner => <OwnerRow
                key={owner.id}
                nftID={nftID}
                owner={owner}
                isUserOwner={isAddressOwner(address, owner.owner)}
            />)}
        </div>
    );
}