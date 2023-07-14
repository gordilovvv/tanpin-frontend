import { NFTExplorer } from '@/components/Explorer';
import { Container } from '@/components/Layout';
import { useAccount } from '@/states/user/hooks/useAccount';

export function OwnedView() {
    const { address } = useAccount();
    return (
        <Container space>
            <NFTExplorer
                type='ownership'
                ownerAddress={address}
            />
        </Container>
    );
}