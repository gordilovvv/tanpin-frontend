import { Link } from 'react-router-dom';
import styles from './NFTActionText.module.scss';

type ActionTextProps = {
    text: string,
    gameID: string,
    nftName: string,
    collectionID: string,
    collectionName: string
}

export function NFTActionText({ text, gameID, nftName, collectionID, collectionName }: ActionTextProps) {
    const collectionURL = `/${gameID}/${collectionID}`;

    return (
        <div className={styles.text}>
            {text} <span>{nftName}</span> from <Link to={collectionURL}>{collectionName}</Link> collection
        </div>
    );
}