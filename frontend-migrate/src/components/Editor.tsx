import React from "react";

interface EditorProps {
    title?: string;
    content?: string;
    isEdit: boolean;
    onSubmit: () => void; 
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    onChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
    onSave: (content: string) => void;
}
export default function Component({
    title,
    content = '',
    onChangeTitle,
    onChangeContent,
    onSubmit,
}: EditorProps) {
    return <div>
        <label htmlFor="title" >Title</label>
        <input value={title} onChange={onChangeTitle} id="title" name="title"></input>
        <button onClick={onSubmit}>Publish</button>
        <textarea style={{display: "block"}} value={content} onChange={onChangeContent}></textarea>
        
    </div>
}