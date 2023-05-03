import styles from './GameHead.module.scss';
import { CollectionLogo } from '@/components/Collections/Logo/CollectionLogo';
import { Title, Button, UnstyleLink } from '@/uikit';
import { Container } from '@/components/Layout';
import { socialsList } from '@/config/constants/socials';
import { Game } from '@/states/game/types';

type GameHeadProps = {
    game: Game | undefined;
};

export function GameHead({ game }: GameHeadProps) {
    if (!game) return <div>loading</div>;

    const { name, logoURL, coverURL } = game;

    return (
        <div className={styles.wrapper}>
            <div className={styles.cover}>
                <img
                    className={styles.coverImg}
                    src={coverURL}
                    alt={name}
                />
            </div>

            <Container className={styles.content}>
                <div className={styles.contentWrap}>
                    <div className={styles.contentHeader}>
                        <div className={styles.contentInner}>
                            <CollectionLogo
                                size='m'
                                image={logoURL}
                                className={styles.contentImg}
                            />

                            <Title className={styles.contentTitle}>{name}</Title>
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

                    <div className={styles.contentText}>
                        The world's first blockchain-based GTA RP project. Create your own world with
                        your favorite content creators, play and earn NFTs, exchange resources and other
                        stuff with players and earn on selling it on Tanpin.
                    </div>
                </div>

                <div className={styles.info}>
                    <div className={styles.infoItem}>
                        <div className={styles.infoTitle}>Floor Price</div>
                        <div className={styles.infoBody}>57.8 USDT</div>
                    </div>

                    <div className={styles.infoItem}>
                        <div className={styles.infoTitle}>Floor Price</div>
                        <div className={styles.infoBody}>57.8 USDT</div>
                    </div>

                    <div className={styles.infoItem}>
                        <div className={styles.infoTitle}>Floor Price</div>
                        <div className={styles.infoBody}>57.8 USDT</div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
