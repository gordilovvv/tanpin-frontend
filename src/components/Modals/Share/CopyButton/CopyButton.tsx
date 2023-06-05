import { Button } from '@/uikit';
import { useState } from 'react';
import copy from 'copy-to-clipboard';
// import styles from './CopyButton.module.scss';

type CopyButtonProps = {
    url: string
}

const TIMEOUT_TIME = 2000;

export function CopyButton({ url }: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState(false);

    let timeout: ReturnType<typeof setTimeout> | undefined;

    const handleCopy = () => {
        try {
            copy(url, {
                onCopy: () => {
                    clearTimeout(timeout);
                    setIsCopied(true);
                    timeout = setTimeout(() => {
                        setIsCopied(false);
                    }, TIMEOUT_TIME);
                }
            });

        } catch (error) {
            console.error(error);
            //todo notification 
        }
    };
    return (
        <Button
            onClick={handleCopy}
            view='secondary'
        >{
                isCopied
                    ?
                    'Copied'
                    :
                    'Copy'
            }</Button>
    );
}