import React, { useEffect, useRef } from "react";

import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Toolbar from "./Toolbar";

interface EditorProps {
    title?: string;
    content?: string;
    isEdit: boolean;
    onSubmit: () => void;
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeContent: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    onSave: (content: string) => void;
}
export default function Component({
    title,
    content = '',
    onChangeTitle,
    onChangeContent,
}: EditorProps) {
    const contentEditableRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (contentEditableRef.current && contentEditableRef.current.innerHTML !== content) {
            contentEditableRef.current.innerHTML = content;
        }
    });
    const handleSelect: React.ReactEventHandler<HTMLDivElement> = (event) => {
        console.log((event.target as HTMLTextAreaElement).selectionStart, (event.target as HTMLTextAreaElement).selectionEnd);
    };
    const handleCommand = (event: React.MouseEvent<HTMLButtonElement>) => {
        const command = event.currentTarget.value;
        if (command) document.execCommand(command, false);
    };
    // TODO: implement toggle
    const handleAddCodeBlock = (event: React.MouseEvent<HTMLButtonElement>) => {
        document.execCommand('formatBlock', false, '<pre>');
    };
    // TODO: implement font size picking
    const handleFontSizeSelect = (fontSize: string) => {
        console.log(fontSize);
        // come up with another command, this doesn't work
        document.execCommand('fontSize', false, fontSize);
    };
    return <Box sx={{
        height: 'calc(100vh - var(--Header-height))',
    }}>
        <Input placeholder="Blog Title" value={title} onChange={onChangeTitle} id="title" name="title" sx={{ my: 2 }} />
        <Toolbar />
        <Box
            ref={contentEditableRef}
            contentEditable
            sx={{
                height: 'calc(100% - 200px)',
                border: '1px solid black',
                borderRadius: '8px', // Add border radius
                padding: '10px', // Add padding
            }}
            onInput={onChangeContent}
        />
    </Box >
}
