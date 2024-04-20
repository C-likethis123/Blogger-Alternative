import { createContext, useState } from "react";

type EditorValue = {
    isEditorOpen: boolean;
    toggleEditor: () => void;
}
const EditorContext = createContext<EditorValue>({} as EditorValue);

function useEditorContextProps(): EditorValue {
    const [mode, setMode] = useState<boolean>(true);
}

export const EditorProvider = ({ children}: {
    children: React.ReactNode;
    value?: EditorValue;
}) => {
    const values = useEditorContextProps();
    return (<EditorContext.Provider value={values}>
        {children}
    </EditorContext.Provider>)
}

export default EditorContext;