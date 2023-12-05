import { useLayoutEffect, useRef } from 'react';
import { UnstyleButton } from '@/uikit';
import classNames from 'classnames';
import styles from './SlideButton.module.scss';

type SlideButtonProps = {
    active: boolean
    paused: boolean
    animationTime: number
    onClick: () => void
}

export function SlideButton({ active, paused, animationTime, onClick }: SlideButtonProps) {
    const progress = useRef<HTMLDivElement>(null);

    const isActive = useRef(active);
    const isPaused = useRef(paused);

    useLayoutEffect(() => {
        isActive.current = active;
        isPaused.current = paused;

        if (isActive.current) {
            let startTime: number | undefined;

            const animationFrameId = requestAnimationFrame(function animate(currentTime) {
                startTime = startTime || currentTime;

                const elapsed = currentTime - startTime;

                if (!(elapsed > animationTime) && isActive.current && !isPaused.current) {
                    const percentage = 0 + 100 * Math.min(elapsed / animationTime, 1);

                    if (progress.current && percentage <= 100) {
                        progress.current.style.width = `${percentage}%`;
                    }

                    requestAnimationFrame(animate);
                }
            });

            return () => {
                cancelAnimationFrame(animationFrameId);
            };
        }

        if (progress.current) {
            progress.current.style.width = '0px';
        }

        return () => { };
    }, [active, paused, animationTime]);

    return (
        <UnstyleButton
            className={styles.button}
            onClick={onClick}
        >
            <div
                className={classNames(styles.wrap, {
                    [styles.active]: active
                })}
            >
                <div
                    ref={progress}
                    className={styles.progress}
                ></div>
            </div>
        </UnstyleButton>
    );
}