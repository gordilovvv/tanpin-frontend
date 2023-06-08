import { useOpenedState } from '@/hooks/useOpenedState';
import { Button, Polygon, Share } from '@/uikit';
import { ShareModal } from '@/components/Modals';
import styles from './TokenShareLinks.module.scss';

export function TokenShareLinks() {
    const shareState = useOpenedState();
    return (
        <>
            <ShareModal
                isOpen={shareState.isOpen}
                onClose={shareState.close}
            />

            <div className={styles.buttons}>
                <Button
                    iconSlot={<Polygon />}
                    view="secondary"
                >
                    PolygonScan
                </Button>

                <Button
                    iconSlot={<Share />}
                    view="secondary"
                    onClick={shareState.open}
                >
                    Share
                </Button>
            </div>
        </>
    );
}