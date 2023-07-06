import { Container } from '@/components/Layout';
import { CollectionsExplorer } from '@/components/Explorer';
import { useAccount } from '@/states/user/hooks/useAccount';

export function CollectionsView() {
    const { address } = useAccount();

    return (
        <Container space>
            <CollectionsExplorer userAddress={address} />
        </Container>
    );
}
