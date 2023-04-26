import { useState } from 'react';

export const useInput = (initialValue = '') => {
    const [value, setValue] = useState<string>(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return {
        value,
        onChange: handleChange,
        setValue,
    };
};
