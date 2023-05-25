import { NFTSearching } from './components/NFTSeacrhing/NFTSearching';
import { Container } from '@/components/Layout';
import styles from './NFTView.module.scss';

export function NFTView() {
    return (
        <div>
            <Container space>
                <NFTSearching />
            </Container>
        </div>
    );
}