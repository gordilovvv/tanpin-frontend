import { Skeleton } from '@/uikit';
import styles from './TransitionRowSkeleton.module.scss';

type TransitionRowSkeletonProps = {
    widthType: number
}

const WIDTHS = [55, 60, 65];

export function TransitionRowSkeleton({ widthType }: TransitionRowSkeletonProps) {
    const currentWidth = widthType % WIDTHS.length;
    return (
        <Skeleton
            style={{ width: `${WIDTHS[currentWidth]}%` }}
            className={styles.skeleton}
        />
    );
}