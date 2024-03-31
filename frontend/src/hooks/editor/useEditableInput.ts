import { useState } from "react";

function useEditableInput(initialValue: string) {
    const [value, setValue] = useState<string>(initialValue);

    const handleChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const val = e.currentTarget;
        console.log(val.innerHTML);
        setValue(val.innerHTML);
    };

    return [
        value,
        handleChange,
        setValue
    ] as [string, (e: React.KeyboardEvent<HTMLDivElement>) => void, React.Dispatch<React.SetStateAction<string>>];
}

export default useEditableInput;