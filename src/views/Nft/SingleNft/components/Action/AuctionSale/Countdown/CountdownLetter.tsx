type CountdownLetterProps = {
    count: number
    label: string,
    end?: boolean,
    className?: string
}

export function CountdownLetter({ count, label, end, className }: CountdownLetterProps) {
    const str = count.toString();

    let value: string;

    if (count === 0 && end) {
        value = '0';
    } else if (str.length < 2) {
        value = `0${str}`;
    } else if (str.length > 2) {
        value = '99+';
    } else {
        value = str;
    }

    return (
        <span className={className}>
            {value}{label}
        </span>
    );
}