import styles from './GameHead.module.scss';
import { CollectionLogo } from '@/components/Collections/Logo/CollectionLogo';
import { Title, Button, UnstyleLink } from '@/uikit';
import { Container } from '@/components/Layout';
import { socialsList } from '@/config/constants/socials';
import { Game } from '@/states/game/types';
import { formatTokenAmount } from '@/utils/formatTokenAmount';

type GameHeadProps = {
    game: Game | undefined;
};

// TODO: Loading
export function GameHead({ game }: GameHeadProps) {
    if (!game) return <div>loading</div>;

    const { name, description, logoURL, coverURL, stats } = game;

    return (
        <div className={styles.wrapper}>
            <div className={styles.cover}>
                <img
                    className={styles.coverImg}
                    src={coverURL}
                    alt={name}
                />
            </div>

            <Container>
                <div className={styles.container}>
                    <div className={styles.top}>
                        <div className={styles.info}>
                            <CollectionLogo
                                size='m'
                                image={logoURL}
                                className={styles.infoLogo}
                            />

                            <Title className={styles.infoTitle}>{name}</Title>
                        </div>

                        <div className={styles.socialsDesktop}>
                            {socialsList.map((social) => (
                                <UnstyleLink
                                    key={social.name}
                                    href={social.url}
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    className={styles.socialsIcon}
                                >
                                    <social.icon />
                                </UnstyleLink>
                            ))}
                        </div>

                        <div className={styles.socialsMobile}>
                            {socialsList.map((social) => (
                                <Button
                                    key={social.url}
                                    as="a"
                                    view="secondary"
                                    href={social.url}
                                    rel="noreferrer noopener"
                                    target="_blank"
                                    iconSlot={<social.icon />}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.description}>
                        {description}
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.statsItem}>
                            <div className={styles.statsLabel}>Items</div>
                            <div className={styles.statsValue}>{stats.items}</div>
                        </div>

                        <div className={styles.statsItem}>
                            <div className={styles.statsLabel}>Volume (1D)</div>
                            <div className={styles.statsValue}>{formatTokenAmount(stats.volume.amount)} {stats.volume.currency}</div>
                        </div>

                        <div className={styles.statsItem}>
                            <div className={styles.statsLabel}>Collections</div>
                            <div className={styles.statsValue}>{stats.collections}</div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
