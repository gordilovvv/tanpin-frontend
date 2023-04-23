import { Link } from 'react-router-dom';
import { Button } from '@/uikit';
import { Container } from '@/components/Layout';
import { Logo } from './Logo';
import { footerLinks } from '../config';
import { socialsList } from '@/config/constants/socials';
import styles from './Footer.module.scss';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.stack}>
                        <div className={styles.project}>
                            <Link
                                to='/'
                                className={styles.logo}
                            >
                                <Logo />
                            </Link>

                            <div className={styles.about}>
                                Building the new<br />
                                gaming economy
                            </div>
                        </div>

                        <div className={styles.community}>
                            <div className={styles.title}>
                                Join our community:
                            </div>

                            <div className={styles.socials}>
                                {socialsList.map(social => <Button
                                    key={social.name}
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

                    <div className={styles.stack}>
                        <div className={styles.menu}>
                            {footerLinks.map(({ text, ...link }) => <Link
                                key={link.to}
                                {...link}
                                className={styles.menuLink}
                            >
                                {text}
                            </Link>)}
                        </div>

                        <div className={styles.copyright}>
                            © 2023 MMM Legacy Team
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}