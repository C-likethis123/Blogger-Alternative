import React, { useState } from "react";

interface EditorProps {
    title?: string;
    content?: string;
    isEdit: boolean;
    onSubmit: (content: string) => void; 
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    onSave: (content: string) => void;
}
export default function Component({
    title,
    content = '',
    onChangeTitle,
    onSubmit,
}: EditorProps) {
    const [editorValue, setEditorValue] = useState(content);
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditorValue(event.target.value);
    }

    useEffect(() => setEditorValue(content), [content]);
  
    return <div>
        <label htmlFor="title" >Title</label>
        <input value={title} onChange={onChangeTitle} id="title" name="title"></input>
        <button onClick={() => onSubmit(editorValue)}>Publish</button>
        <textarea style={{display: "block"}} value={editorValue} onChange={onChange}></textarea>
        
    </div>
}