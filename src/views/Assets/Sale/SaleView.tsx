import { NFTExplorer } from '@/components/Explorer';
import { Container } from '@/components/Layout';
import { useAccount } from '@/states/user/hooks/useAccount';

export function SaleView() {
    const { address } = useAccount();

    return (
        <Container space>
            <NFTExplorer
                type='ownershipSale'
                ownerAddress={address}
            />
        </Container >
    );
}
