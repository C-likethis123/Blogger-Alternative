import React from "react";

import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/joy/Box';

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
    return <Box sx={{
        height: 'calc(100vh - var(--Header-height))',
    }}>
        <Input placeholder="Blog Title" value={title} onChange={onChangeTitle} id="title" name="title" sx={{ my: 2 }} />
        <Textarea sx={{
            resize: 'both',
            overflow: 'auto',
            width: '100%',
            my: 2,
            height: 'calc(100% - 200px)'
        }} value={content} onChange={onChangeContent} placeholder="Blog Content" />

    </Box>
}
