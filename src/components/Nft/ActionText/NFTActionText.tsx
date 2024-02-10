import { Link } from 'react-router-dom';
import { useTranslation } from '@/localization';
import styles from './NFTActionText.module.scss';

type ActionTextProps = {
    text: string,
    gameID: string,
    nftName: string,
    collectionID: string,
    collectionName: string
}

export function NFTActionText({ text, gameID, nftName, collectionID, collectionName }: ActionTextProps) {
    const { t } = useTranslation();
    const collectionURL = `/${gameID}/${collectionID}`;

    return (
        <div className={styles.text}>
            {text} <span>{nftName}</span> {t('from')} <Link to={collectionURL}>{collectionName}</Link> {t('collection')}
        </div>
    );
}