import { Button, SvgProps, Title } from '@/uikit';
import { Container } from '@/components/Layout';
import { HeroCarousel } from './Carousel/HeroCarousel';
import { useTranslation } from '@/localization';
import styles from './HeroBlock.module.scss';

const ArrowDown = (props: SvgProps) => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.0303 9.21967C14.3232 9.51256 14.3232 9.98744 14.0303 10.2803L9.53033 14.7803C9.23744 15.0732 8.76256 15.0732 8.46967 14.7803L3.96967 10.2803C3.67678 9.98744 3.67678 9.51256 3.96967 9.21967C4.26256 8.92678 4.73744 8.92678 5.03033 9.21967L8.25 12.4393L8.25 3.75C8.25 3.33579 8.58579 3 9 3C9.41421 3 9.75 3.33579 9.75 3.75L9.75 12.4393L12.9697 9.21967C13.2626 8.92678 13.7374 8.92678 14.0303 9.21967Z"
                fill="currentColor"
            />
        </svg>
    );
};

export function HeroBlock() {
    const { t } = useTranslation();

    return (
        <div className={styles.wrap}>
            <Container space>
                <div className={styles.content}>
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

                    <div className={styles.main}>
                        <div className={styles.info}>
                            <Title className={styles.title}>
                                {t('Discover, Buy and Sell')}<br />
                                <span>{t('Unique Gaming NFTs')}</span>
                            </Title>

                            <div className={styles.text}>
                                {t('Tanpin is the new generation marketplace, bridging off-chain games with Web 3.0')}
                            </div>
                        </div>

                        <Button
                            to='/collections'
                            view="secondary"
                            iconSlot={<ArrowDown />}
                        >
                            {t('Start Exploring')}
                        </Button>
                    </div>

                    <div className={styles.carousel}>
                        <HeroCarousel />
                    </div>
                </div>
            </Container>
        </div >
    );
}