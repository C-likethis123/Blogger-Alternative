import React from "react";

import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';

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
    onSubmit,
}: EditorProps) {

    const handleSelect: React.ReactEventHandler<HTMLDivElement> = (event) => {
        console.log((event.target as HTMLTextAreaElement).selectionStart, (event.target as HTMLTextAreaElement).selectionEnd);
    };
    return <Box sx={{
        height: 'calc(100vh - var(--Header-height))',
    }}>
        <Input placeholder="Blog Title" value={title} onChange={onChangeTitle} id="title" name="title" sx={{ my: 2 }} />
        <Box contentEditable 
        sx={{
            height: 'calc(100% - 200px)',
            border: '1px solid black',
        }}
            onKeyDown={onChangeContent}
        />

    </Box>
}
