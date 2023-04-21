import React, { useState } from "react";

interface EditorProps {
    title?: string;
    content?: string;
    isEdit: boolean;
    onSubmit: (content: string) => void; 
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    onDelete: () => void; 
    onSave: (content: string) => void;
}
export default function Component(props: EditorProps) {
    const [editorValue, setEditorValue] = useState('');
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditorValue(event.target.value);
    }
  
    return <textarea value={editorValue} onChange={onChange}></textarea>
}