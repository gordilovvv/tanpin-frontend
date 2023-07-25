import { ImgHTMLAttributes, ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import { useLoaded } from './hooks';
import classNames from 'classnames';
import styles from './Image.module.scss';

type ImageProps = {
    pending?: ReactNode,
    rejected?: ReactNode
} & ImgHTMLAttributes<HTMLImageElement>

// TODO: Позже можно доделать отображение ошибки
export const Image = forwardRef<HTMLImageElement, ImageProps>(
    ({ src, pending, rejected, className, ...props }, ref) => {
        const imageRef = useRef<HTMLImageElement>(null);
        const isLoaded = useLoaded(src);

        useImperativeHandle(
            ref,
            () => imageRef.current!
        );

        if (src) {
            return (<>
                <img
                    ref={imageRef}
                    src={src}
                    {...props}
                    className={classNames(styles.image, className, {
                        [styles.loading]: !isLoaded,
                        [styles.loaded]: isLoaded
                    })}
                />

                {!isLoaded && pending}
            </>);
        }

        if (rejected) {
            return (<>{rejected}</>);
        }

        return null;
    }
);

Image.displayName = 'Image';