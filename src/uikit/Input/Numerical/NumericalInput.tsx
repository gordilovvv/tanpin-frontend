import { HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './NumericalInput.module.scss';

const inputRegex = RegExp('^\\d*(?:\\\\[.])?\\d*$'); // match escaped "." characters via in a non-capturing group

function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

type NumericalInputProps = {
    value: string | number
    onInput: (input: string) => void
} & HTMLAttributes<HTMLInputElement>

export function NumericalInput({ value, placeholder, className, onInput, ...props }: NumericalInputProps) {
    const enforcer = (nextUserInput: string) => {
        if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
            onInput(nextUserInput);
        }
    };

    return (
        <input
            className={classNames(styles.input, className)}
            {...props}
            value={value}
            onChange={(event) => {
                // replace commas with periods, because we exclusively uses period as the decimal separator
                enforcer(event.target.value.replace(/,/g, '.'));
            }}
            // universal input options
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            // text-specific options
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder={placeholder}
            spellCheck="false"
        />
    );
}