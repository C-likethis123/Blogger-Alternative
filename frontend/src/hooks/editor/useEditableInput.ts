import { useState } from "react";

function useEditableInput(initialValue: string) {
    const [value, setValue] = useState<string>(initialValue);

    const handleChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const val = e.currentTarget;
        if (e.key === 'Tab') {
            e.preventDefault();
            document.execCommand('indent', false);
        }
        setValue(val.innerHTML);
    };

    return [
        value,
        handleChange,
        setValue
    ] as [string, (e: React.KeyboardEvent<HTMLDivElement>) => void, React.Dispatch<React.SetStateAction<string>>];
}

export default useEditableInput;