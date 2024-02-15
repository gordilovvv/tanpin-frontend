import styles from './BackgroundGradient.module.scss';

export function BackgroundGradient() {
    return (
        <div
            className={styles.background}
            style={{
                ['--gradient-1' as string]: '#3CE361',
                ['--gradient-2' as string]: '#1C379A',
                ['--gradient-3' as string]: 'rgba(255, 0, 122, 0.50)',
            }}
        >
            <div className={styles.gradientFirst}></div>
            <div className={styles.gradientSecond}></div>
            <div className={styles.gradientThird}></div>
        </div>
    );
}