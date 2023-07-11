import { TokenAttributes, TokenImage } from '@/components/Nft';
import { CollectionLogo } from '@/components/Collections';
import { Link } from 'react-router-dom';
import { Button } from '@/uikit';
import { Container } from '@/components/Layout';
import styles from './MintTokenView.module.scss';


export function MintTokenView() {
    return (
        <div className={styles.wrapper}>
            <Container maxWidth={480}>
                <TokenImage
                    className={styles.logo}
                    image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwvUtpwXPhn4AQOOwvtCmVMaRXYUhOZgyv-w&usqp=CAU'}
                />

                <div className={styles.body}>
                    <div className={styles.header}>
                        <div className={styles.collectionWrap}>
                            <Link
                                to={'/'}
                                className={styles.collection}
                            >
                                <CollectionLogo
                                    image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwvUtpwXPhn4AQOOwvtCmVMaRXYUhOZgyv-w&usqp=CAU'}
                                    size='xxs'
                                />

                                <div className={styles.collectionName}>
                                    test
                                </div>
                            </Link>

                        </div>

                        <div className={styles.title}>Title</div>
                    </div>

                    <Button block >Mint this NFT for 1 USDT</Button>

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
                </div>
            </Container>
        </div>
    );
}