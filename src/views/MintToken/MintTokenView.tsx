import { TokenAttributes, TokenImage } from '@/components/Nft';
import { CollectionLogo } from '@/components/Collections';
import { Link } from 'react-router-dom';
import { Button } from '@/uikit';
import { Container } from '@/components/Layout';
import styles from './MintTokenView.module.scss';


export function MintTokenView() {
    return (
        <div className={styles.wrap}>
            <div className={styles.background}>
                <div
                    className={styles.image}
                    style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/Y3ntI_ck-RFUAEYQdQ9q2V4RHhTfkD_mbpGMtP_1YuOXYTmwjCH9EiWz-5o6i_95jV35_9UJlYkj9HdrFbbkF-1OpPNg1oAmsIVD)' }}
                ></div>
            </div>

            <Container
                maxWidth={510}
                className={styles.container}
            >
                <div className={styles.imageWrap}>
                    <div
                        className={styles.blurImage}
                        style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/Y3ntI_ck-RFUAEYQdQ9q2V4RHhTfkD_mbpGMtP_1YuOXYTmwjCH9EiWz-5o6i_95jV35_9UJlYkj9HdrFbbkF-1OpPNg1oAmsIVD)' }}
                    ></div>

                    <TokenImage
                        image={'https://lh3.googleusercontent.com/Y3ntI_ck-RFUAEYQdQ9q2V4RHhTfkD_mbpGMtP_1YuOXYTmwjCH9EiWz-5o6i_95jV35_9UJlYkj9HdrFbbkF-1OpPNg1oAmsIVD'}
                        className={styles.image}
                    />
                </div>

                <div className={styles.body}>
                    <div className={styles.header}>
                        <div className={styles.collectionWrap}>
                            <Link
                                to={'/'}
                                className={styles.collection}
                            >
                                <CollectionLogo
                                    image={'https://lh3.googleusercontent.com/SPA1zdqNLo9JrLHB7Z-I7ivwgMYmeIEjvIJVL0E7njvCyL9t9ewCs4imG2t9-UhQ5MOp4u_Pp26l1neLNWSN7l9wOV_b_rQA4nY=s1000'}
                                    size='xxs'
                                />

                                <div className={styles.collectionName}>
                                    test
                                </div>
                            </Link>

                        </div>

                        <div className={styles.title}>Title</div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemTitle}>Properties</div>

                        <TokenAttributes
                            attributes={[{
                                traitType: 'test',
                                value: 'value',
                            }, {
                                traitType: 'test',
                                value: 'value',
                            }, {
                                traitType: 'test',
                                value: 'value',
                            }, {
                                traitType: 'test',
                                value: 'value',
                            },]}
                        />
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemTitle}>Description</div>

                        <div className={styles.description}>
                            The Mercedes-Benz A-Class is a compact car produced by the German automobile manufacturer Mercedes-Benz as the brand's entry-level vehicle. The A 45 AMG is a performance version of the A-Class.
                        </div>
                    </div>

                    <Button>Mint this NFT for 1 USDT</Button>
                </div>
            </Container>
        </div>
    );
}