import { useState } from "react";

function useEditableInput(initialValue: string) {
    const [value, setValue] = useState<string>(initialValue);

    const handleChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const val = e.currentTarget;
        console.log(val.innerHTML);
        console.log(e.key)
        if (e.key === 'Tab') {
            e.preventDefault();
            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);
            const tabSize = 4; // Set the desired tab size (number of spaces)
            const tab = ' '.repeat(tabSize);
            range?.deleteContents();
            range?.insertNode(document.createTextNode(tab));
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