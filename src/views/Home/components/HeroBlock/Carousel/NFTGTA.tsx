import { Button, FeaturedGame } from '@/uikit';
import heroCards from '@/app/assets/images/hero-cards.png';
import styles from './NFTGTA.module.scss';
import { Link } from 'react-router-dom';

export function NFTGTA() {
    return (
        <div className={styles.wrap}>
            <div className={styles.label}>
                <div className={styles.labelIcon}>
                    <FeaturedGame />
                </div>

                <div className={styles.labelText}>
                    Featured Game
                </div>
            </div>

            <div className={styles.cards}>
                <Link
                    to='/collections'
                    className={styles.cardsLink}
                >
                    <img
                        src={heroCards}
                        alt=''
                    />
                </Link>
            </div>

            <div className={styles.game}>
                <div className={styles.gameName}>
                    NFTGTA.io
                </div>

                <Button to='/collections'>
                    View collections
                </Button>
            </div>
        </div>
    );
}