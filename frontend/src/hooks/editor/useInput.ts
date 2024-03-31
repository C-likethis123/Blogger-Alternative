import { useState } from "react";

function useInput(initialValue: string) {
    const [value, setValue] = useState<string>(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return [
        value,
        handleChange,
        setValue
    ] as [string, (e: React.ChangeEvent<HTMLInputElement>) => void, React.Dispatch<React.SetStateAction<string>>];
}

export default useInput;