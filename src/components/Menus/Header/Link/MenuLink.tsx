import { NavLink } from 'react-router-dom';
import { NavLink as NavLinkType } from '../../config';
import classNames from 'classnames';
import styles from './MenuLink.module.scss';

type MenuLinkProps = NavLinkType;

export function MenuLink({ text, to, target, rel, gradient }: MenuLinkProps) {
    return (
        <NavLink
            to={to}
            rel={rel}
            target={target}
            className={({ isActive }) => classNames(styles.link, {
                [styles.active]: isActive,
                [styles.gradient]: gradient
            })}
        >
            {text}
        </NavLink>
    );
}