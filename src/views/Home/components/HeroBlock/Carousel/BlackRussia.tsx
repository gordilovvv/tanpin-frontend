import { Button } from '@/uikit';
import { blackRussiaSocialsList } from '@/config/constants/socials';
import blackRussiaLogo from '@/app/assets/images/blackrussia-tanpin.png';
import blackRussiaBackground from '@/app/assets/images/blackrussia-tanpin-bg.png';
import styles from './BlackRussia.module.scss';

export function BlackRussia() {
    return (
        <div className={styles.banner}>
            <div
                className={styles.background}
                style={{ backgroundImage: `url(${blackRussiaBackground})` }}
            ></div>

            <div className={styles.inner}>
                <div className={styles.logos}>
                    <img
                        src={blackRussiaLogo}
                        alt='BlackRussia'
                    />
                </div>

                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.title}>
                            Please welcome: Black Russia
                        </div>

                        <div className={styles.description}>
                            We're teaming up to bring you a one-of-a-kind mobile MMO gaming experience.
                            More details coming soon, follow our social media to keep yourself updated.
                        </div>
                    </div>

                    <div className={styles.socials}>
                        {blackRussiaSocialsList.map(social => <Button
                            key={social.url}
                            as='a'
                            view='secondary'
                            href={social.url}
                            rel='noreferrer noopener'
                            target='_blank'
                            className={styles.socialsItem}
                            iconSlot={<social.icon />}
                        />)}
                    </div>
                </div>
            </div>
        </div>
    );
}