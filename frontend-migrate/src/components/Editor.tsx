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
export default function Component({
    title,
    onChangeTitle
}: EditorProps) {
    const [editorValue, setEditorValue] = useState('');
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditorValue(event.target.value);
    }
  
    return <div>
        <label htmlFor="title" >Title</label>
        <input value={title} onChange={onChangeTitle} id="title" name="title"></input>
        <textarea style={{display: "block"}} value={editorValue} onChange={onChange}></textarea>
        
    </div>
}