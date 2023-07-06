import { InputHTMLAttributes, forwardRef } from 'react';
import { UnstyleInput } from './UnstyleInput';

const inputRegex = RegExp('^\\d*(?:\\\\[.])?\\d*$'); // match escaped "." characters via in a non-capturing group

function escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

type NumericalInputProps = {
    onInput?: (input: string) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onInput'>

export const NumericalInput = forwardRef<HTMLInputElement, NumericalInputProps>(
    ({ value, placeholder, onInput, ...props }, ref) => {
        const enforcer = (nextUserInput: string) => {
            if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
                onInput?.(nextUserInput);
            }
        };

        return (
            <UnstyleInput
                ref={ref}
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
);

NumericalInput.displayName = 'NumericalInput';