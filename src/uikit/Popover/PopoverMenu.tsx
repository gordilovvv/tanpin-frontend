import { CSSProperties, PropsWithChildren, forwardRef } from 'react';
import { AnimatePresence, domMax, LazyMotion, motion, MotionProps } from 'framer-motion';
import { Menu, MenuStore } from '@ariakit/react';
import classNames from 'classnames';
import styles from './PopoverMenu.module.scss';

type PopoverProps = {
    state: MenuStore,
    width?: number,
    maxHeight?: number,
    className?: string,
    animate?: MotionProps['animate'];
    transition?: MotionProps['transition'];
    variants?: MotionProps['variants'];
    initial?: MotionProps['initial'];
    exit?: MotionProps['exit'];
}

export const PopoverMenu = forwardRef<HTMLDivElement, PropsWithChildren<PopoverProps>>(
    ({ state, width, maxHeight, className, children, ...animProps }, ref) => {
        const mounted = state.useState('mounted');
        // const currentPlacement = state.useState('currentPlacement');

        const style: CSSProperties = {
            width: width && `${width}px`,
            maxHeight: maxHeight && `${maxHeight}px`,
            overflow: maxHeight ? 'auto' : undefined
        };

        if (animProps.variants) {
            return (
                <LazyMotion features={domMax}>
                    <AnimatePresence>
                        {mounted && <Menu
                            as={motion.div}
                            ref={ref}
                            store={state}
                            hidden={false}
                            className={classNames(styles.box, className)}
                            style={style}
                            {...animProps}
                        >
                            {children}
                        </Menu>}
                    </AnimatePresence>
                </LazyMotion >
            );
        }

        return (
            <Menu
                as='div'
                ref={ref}
                store={state}
                className={classNames(styles.box, className)}
                style={style}
            >
                {children}
            </Menu>
        );
    }
);

PopoverMenu.displayName = 'PopoverMenu';