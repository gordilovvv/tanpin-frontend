import { Button, Polygon, Share } from '@/uikit';
import styles from './TokenShareLinks.module.scss';

export function TokenShareLinks() {
    return (
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
    );
}