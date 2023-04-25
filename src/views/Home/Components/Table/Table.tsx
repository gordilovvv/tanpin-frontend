import styles from './Table.module.scss';
import { ColletctionTable } from '@/components/Collections';
import { Title, Button } from '@/uikit';


type TableProps = {
}

export function Table({ }: TableProps) {
    return (
        <div className={styles.wrapper}>
            <Title className={styles.title}>Trending Collections</Title>

            <ColletctionTable>
                <Button
                    view='secondary'
                    block
                >View collections</Button>
            </ColletctionTable >

        </div>
    );

}