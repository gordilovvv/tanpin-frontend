import { Copy, UnstyleButton } from '@/uikit';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import classNames from 'classnames';
import styles from './CopyButton.module.scss';

type CopyButtonProps = {
    value: string,
    toastText: string,
    className?: string
}

export function CopyButton({ value, toastText, className }: CopyButtonProps) {
    const { handleCopy } = useCopyToClipboard(value, toastText);

    return (
        <UnstyleButton
            className={classNames(styles.copy, className)}
            onClick={handleCopy}
        >
            <Copy />
        </UnstyleButton>
    );
}