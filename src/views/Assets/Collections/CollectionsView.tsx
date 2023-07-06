import { Container } from '@/components/Layout';
import { CollectionExplorer } from '@/components/Explorer';
import { useAccount } from '@/states/user/hooks/useAccount';

export function CollectionsView() {
    const { address } = useAccount();

    return (
        <Container space>
            <CollectionExplorer userAddress={address} />
        </Container>
    );
}
