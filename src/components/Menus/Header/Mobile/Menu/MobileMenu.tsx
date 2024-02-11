import { useCallback, useMemo } from 'react';
import { Button, Select } from '@/uikit';
import { NavLink } from 'react-router-dom';
import { headerAdditionalLinks, headerLinks } from '@/components/Menus/config';
import { socialsList } from '@/config/constants/socials';
import { useAccount } from '@/states/user/hooks/useAccount';
import { languageList, savePreferredLanguage, useTranslation } from '@/localization';
import classNames from 'classnames';
import styles from './MobileMenu.module.scss';

export function MobileMenu() {
    const { t, i18n } = useTranslation();
    const { isConnected } = useAccount();

    const languages = useMemo(() => {
        return languageList.map(({ language, locale }) => {
            return {
                value: locale,
                label: language
            };
        });
    }, []);

    const changeLanguage = useCallback((locale: string) => {
        savePreferredLanguage(locale);
        window.location.reload();
    }, []);

    return (
        <div className={styles.wrap}>
            <div className={styles.menu}>
                {headerLinks.map(link => <NavLink
                    key={link.to}
                    to={link.to}
                    className={styles.menuLink}
                >
                    {link.text}
                </NavLink>)}

                {isConnected && <NavLink
                    to='/activity'
                    className={styles.menuLink}
                >
                    {t('Notifications')}
                    {/* TODO: {notificationsCount > 0 && <div className={styles.circle} />} */}
                </NavLink>}

                {headerAdditionalLinks.map(link => <NavLink
                    key={link.to}
                    to={link.to}
                    className={classNames(styles.menuLink, {
                        [styles.menuLinkGradient]: link.gradient
                    })}
                >
                    {link.text}
                </NavLink>)}
            </div>

            <div className={styles.bottom}>
                <div className={styles.socials}>
                    {socialsList.map(social => <Button
                        key={social.name}
                        as='a'
                        view='secondary'
                        href={social.url}
                        rel='noreferrer noopener'
                        target='_blank'
                        iconSlot={<social.icon />}
                    />)}
                </div>

                <Select
                    options={languages}
                    selectedValue={i18n.language}
                    onChange={changeLanguage}
                />
            </div>
        </div>
    );
}