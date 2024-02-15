import { Link } from 'react-router-dom';
import { Button, SvgProps } from '@/uikit';
import { Container } from '@/components/Layout';
import { Logo } from './Logo';
import { footerLinks } from '../config';
import { socialsList } from '@/config/constants/socials';
import { useTranslation } from '@/localization';
import styles from './Footer.module.scss';

const HolderIcon = (props: SvgProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M7.5 7.88759H10.7828V11.4212L11.8388 11.4109L12.8891 11.3965L12.9052 8.02464L12.9157 2.5H16.1984V16.1814H12.9157L12.9052 14.4048L12.8891 12.6231L11.8388 12.6087L10.7828 12.5993V21.5H7.5V7.88759Z"
                fill="currentColor"
            />
        </svg>
    );
};

export function Footer() {
    const { t } = useTranslation();

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
                                {t('Building the new')}<br />
                                {t('gaming economy')}
                            </div>
                        </div>

                        <div className={styles.community}>
                            <div className={styles.title}>
                                {t('Join our community:')}
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

                                <Button
                                    as='a'
                                    view='secondary'
                                    href='https://holder.io/ru/coins/tanpin/'
                                    rel='noreferrer noopener'
                                    target='_blank'
                                    className={styles.socialsItem}
                                    iconSlot={<HolderIcon />}
                                />
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
                            2024 © {t('All rights reserved')}
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}