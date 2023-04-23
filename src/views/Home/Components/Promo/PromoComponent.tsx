import { HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './PromoComponent.module.scss';

import { Container } from '@/components/Layout';
import { Title } from '@/uikit';

import { Button } from '@/uikit';
import Cat from '@/app/assets/img/cat.svg';

export function PromoComponent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <Container>
            <div
                className={classNames(styles.promo, className)}
                {...props}
            >
               <div className={styles.inner}>
                <Title className={styles.title}>TanPin is a next generation marketplace that connects off-chain games with Web 3.0</Title> 
                <div className={styles.text}>We aim to create a reliable income stream for game developers and players
through the use of NFTs and game reward pools on the blockchain.</div>
                    <div className={styles.wrapperBtn}>
                        <Button>
                        Become a partner
                        </Button>
                        <Button view={'secondary'}>
                            Learn more
                        </Button>
                    </div>
               </div>

               <img src={Cat} className={styles.img}  /> 
            </div>
        </Container>
    );
}