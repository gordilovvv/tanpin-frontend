import { FormEventHandler, InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { NumericalInput } from './NumericalInput';
import { UnstyleInput } from './UnstyleInput';
import classNames from 'classnames';
import styles from './Input.module.scss';

type InputProps = {
    numerical?: boolean,
    danger?: boolean,
    leftAddon?: string | ReactNode,
    rightAddon?: string | ReactNode,
    onInput?: (input: string) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onInput'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, numerical, danger, leftAddon, rightAddon, onInput, ...props }, ref) => {
        const handleInputType: FormEventHandler<HTMLInputElement> = (event) => {
            onInput?.(event.currentTarget.value);
        };

        return <div className={styles.wrap}>
            <div className={styles.inputWrap}>
                {numerical
                    ? <NumericalInput
                        ref={ref}
                        onInput={onInput}
                        className={classNames(styles.input, className, {
                            [styles.danger]: danger
                        })}
                        {...props}
                    />
                    : <UnstyleInput
                        ref={ref}
                        onInput={handleInputType}
                        className={classNames(styles.input, className, {
                            [styles.danger]: danger
                        })}
                        {...props}
                    />}

                {leftAddon && <div className={styles.leftAddon}>
                    {leftAddon}
                </div>}

                {rightAddon && <div className={styles.rightAddon}>
                    {rightAddon}
                </div>}
            </div>
        </div>;
    }
);

Input.displayName = 'Input';