import { Button, Polygon, Share } from '@/uikit';
import { ShareModal } from '@/components/Modals';
import styles from './TokenShareLinks.module.scss';

export function TokenShareLinks() {
    return (<>

        <ShareModal isOpen={true} />

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
            >
                Share
            </Button>
        </div>
    </>
    );
}